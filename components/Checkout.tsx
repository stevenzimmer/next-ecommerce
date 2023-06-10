"use client"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY!);

export default function Checkout() {
  const cartStore = useCartStore();
  const router = useRouter();

  const [clientSecret, setClientSecret]= useState("");

  useEffect(() => {
    //  Create payment intent as soon as page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,

      })
    }).then((res) => {
      // console.log({res});
      if(res.status === 403) {
        return router.push("/api/auth/signin");
      }
      // Set client secret and payment intent
      return res.json();

    }).then((data) => {
      console.log({data});
      setClientSecret(data.paymentIntent.client_secret);
      cartStore.setPaymentIntent(data.paymentIntent.id);
    })
  }, [])
  return (

    <AnimatePresence>
    <motion.div className="py-2 border-2 text-white bg-teal-700 border-teal-700 w-full rounded-md text-center">Checkout</motion.div>
    </AnimatePresence>
  )
}
