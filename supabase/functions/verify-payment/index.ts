import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = claimsData.claims.sub;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
      return new Response(JSON.stringify({ error: "Missing payment details" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("RAZORPAY_KEY_SECRET not configured");
    }

    // Verify signature using HMAC SHA256
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(RAZORPAY_KEY_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signaturePayload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(signaturePayload));
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch:", { expected: expectedSignature, received: razorpay_signature });
      return new Response(JSON.stringify({ error: "Payment verification failed" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Payment verified — update user's plan using service role
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const amount = plan === "pro" ? 99900 : 249900;
    const planLimit = plan === "pro" ? 999999 : 999999;

    // Update profile
    const { error: profileError } = await adminClient.from("profiles").update({
      plan: plan,
      plan_started_at: new Date().toISOString(),
      plan_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }).eq("user_id", userId);

    if (profileError) {
      console.error("Profile update error:", profileError);
      throw new Error("Failed to update user plan");
    }

    // Insert payment record
    await adminClient.from("payments").insert({
      user_id: userId,
      razorpay_payment_id,
      razorpay_subscription_id: razorpay_order_id,
      amount,
      currency: "INR",
      plan,
      status: "success",
    });

    // Update usage tracking
    await adminClient.from("usage_tracking").update({
      generations_used: 0,
      plan_limit: planLimit,
      reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }).eq("user_id", userId);

    return new Response(JSON.stringify({ success: true, plan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("verify-payment error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
