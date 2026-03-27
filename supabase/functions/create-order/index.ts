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

    const { plan_id } = await req.json();
    if (!plan_id || !["pro", "agency"].includes(plan_id)) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    // Get user profile
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: profile } = await adminClient.from("profiles").select("*").eq("user_id", userId).single();

    const planConfig = plan_id === "pro"
      ? { name: "ContentIQ Pro", amount: 99900, description: "Unlimited AI content generation" }
      : { name: "ContentIQ Agency", amount: 249900, description: "Full agency plan with team access" };

    // Create a Razorpay subscription by first creating a plan, then a subscription
    // For simplicity, we'll use one-time payment via orders API
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
      },
      body: JSON.stringify({
        amount: planConfig.amount,
        currency: "INR",
        receipt: `${plan_id}_${userId}_${Date.now()}`,
        notes: {
          user_id: userId,
          plan: plan_id,
          user_email: profile?.email || "",
        },
      }),
    });

    if (!orderResponse.ok) {
      const errText = await orderResponse.text();
      console.error("Razorpay order creation failed:", orderResponse.status, errText);
      throw new Error("Failed to create Razorpay order");
    }

    const order = await orderResponse.json();

    return new Response(JSON.stringify({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: RAZORPAY_KEY_ID,
      plan: plan_id,
      plan_name: planConfig.name,
      plan_description: planConfig.description,
      user: {
        name: profile?.name || "",
        email: profile?.email || "",
      },
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-order error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
