import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface InitiatePaymentOptions {
  planId: "pro" | "agency";
  onSuccess: (plan: string) => void;
  onError: (error: string) => void;
}

export const initiateRazorpayPayment = async ({ planId, onSuccess, onError }: InitiatePaymentOptions) => {
  try {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      onError("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    // Create order via edge function
    const { data, error } = await supabase.functions.invoke("create-order", {
      body: { plan_id: planId },
    });

    if (error || !data?.order_id) {
      onError(error?.message || "Failed to create order");
      return;
    }

    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "ContentIQ",
      description: data.plan_description,
      order_id: data.order_id,
      prefill: {
        name: data.user?.name || "",
        email: data.user?.email || "",
      },
      theme: {
        color: "#7C3AED",
      },
      handler: async (response: any) => {
        try {
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-payment", {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planId,
            },
          });

          if (verifyError || !verifyData?.success) {
            onError(verifyError?.message || "Payment verification failed");
            return;
          }

          onSuccess(planId);
        } catch (err) {
          onError("Payment verification failed. Please contact support.");
        }
      },
      modal: {
        ondismiss: () => {
          console.log("Razorpay modal dismissed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: any) => {
      onError(response.error?.description || "Payment failed. Please try again.");
    });
    rzp.open();
  } catch (err) {
    onError(err instanceof Error ? err.message : "Something went wrong");
  }
};

export const PLAN_PRICES = {
  free: { amount: 0, display: "₹0", period: "forever" },
  pro: { amount: 999, display: "₹999", period: "/month" },
  agency: { amount: 2499, display: "₹2,499", period: "/month" },
} as const;
