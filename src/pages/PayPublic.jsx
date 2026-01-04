import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPaymentPublicApi } from "../https";

// stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/pay/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PayPublic() {
  const { paymentId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await GetPaymentPublicApi(paymentId);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [paymentId]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#1f1f1f] text-white grid place-items-center">
        Loading...
      </div>
    );
  if (!data?.clientSecret)
    return (
      <div className="min-h-screen bg-[#1f1f1f] text-white grid place-items-center">
        Invalid payment
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#262626] p-6">
        <h1 className="text-xl font-semibold text-white">Pay Now</h1>
        <p className="text-white/70 mt-1">
          Amount: {data.amount} {data.currency?.toUpperCase()}
        </p>

        <div className="mt-5">
          <Elements
            options={{ clientSecret: data.clientSecret }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}
