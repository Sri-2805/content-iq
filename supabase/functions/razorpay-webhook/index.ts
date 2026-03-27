import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const RAZORPAY_WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");
    if (!RAZORPAY_WEBHOOK_SECRET) {
      throw new Error("RAZORPAY_WEBHOOK_SECRET not configured");
    }

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing signature" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify webhook signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(RAZORPAY_WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (expectedSignature !== signature) {
      console.error("Webhook signature mismatch");
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    console.log("Razorpay webhook event:", eventType);

    switch (eventType) {
      case "payment.captured": {
        const payment = event.payload?.payment?.entity;
        if (!payment) break;
        
        const userId = payment.notes?.user_id;
        const plan = payment.notes?.plan;
        if (!userId || !plan) break;

        // Log payment
        await adminClient.from("payments").insert({
          user_id: userId,
          razorpay_payment_id: payment.id,
          razorpay_subscription_id: payment.order_id,
          amount: payment.amount,
          currency: payment.currency,
          plan,
          status: "success",
        });

        // Update plan
        await adminClient.from("profiles").update({
          plan,
          plan_started_at: new Date().toISOString(),
          plan_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }).eq("user_id", userId);

        // Reset usage
        await adminClient.from("usage_tracking").update({
          generations_used: 0,
          plan_limit: 999999,
          reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }).eq("user_id", userId);

        break;
      }

      case "payment.failed": {
        const payment = event.payload?.payment?.entity;
        if (!payment) break;
        
        const userId = payment.notes?.user_id;
        if (!userId) break;

        await adminClient.from("payments").insert({
          user_id: userId,
          razorpay_payment_id: payment.id,
          amount: payment.amount || 0,
          currency: payment.currency || "INR",
          plan: payment.notes?.plan || "unknown",
          status: "failed",
        });

        break;
      }

      case "subscription.cancelled": {
        const subscription = event.payload?.subscription?.entity;
        if (!subscription) break;

        // Find user by subscription ID and downgrade
        const { data: profile } = await adminClient.from("profiles")
          .select("user_id")
          .eq("razorpay_subscription_id", subscription.id)
          .single();

        if (profile) {
          await adminClient.from("profiles").update({
            plan: "free",
            plan_expires_at: new Date(subscription.current_end * 1000).toISOString(),
          }).eq("user_id", profile.user_id);

          await adminClient.from("usage_tracking").update({
            plan_limit: 10,
          }).eq("user_id", profile.user_id);
        }
        break;
      }

      default:
        console.log("Unhandled webhook event:", eventType);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
