import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setMsg("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // optional: return_url: window.location.href
      },
      redirect: "if_required",
    });

    if (error) setMsg(error.message || "Payment failed");
    else setMsg("Payment processing / succeeded (check status)");

    setSubmitting(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="rounded-xl bg-zinc-950/50 border border-white/10 p-3">
        <PaymentElement />
      </div>

      {msg && <p className="text-sm text-white/80">{msg}</p>}

      <button
        disabled={!stripe || submitting}
        className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
      >
        {submitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
