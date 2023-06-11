"use client"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import {  MoveLeft } from "lucide-react";
import { prisma } from "@/lib/prisma"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY!);

import CheckoutForm from "./CheckoutForm";

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
      if(data.paymentIntent.status === "succeeded") {
        cartStore.setCheckoutStatus("success");
        // cartStore.setPaymentIntent("");
        // cartStore.clearCart();
        // prisma.order.update({
        //   where: { paymentIntentID: data.paymentIntent.id },
        //   data: {
        //     status: "Success", 
        //   }
        // });

      } else {
        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);        
      }
      
    })
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    }
  }

  return (

  <>
    {clientSecret && (
      <>
      <div className="mb-12">
      <p className="mb-6">Checkout</p>
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
        </div>
        <AnimatePresence>
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}} 
            className="">
          <Button className="py-2 border-2 bg-white text-teal-700 border-teal-700 hover:border-teal-500 hover:bg-white hover:text-teal-500" onClick={() => cartStore.setCheckoutStatus("cart")}>
          <MoveLeft className="w-4 mr-2" /> 
          Back to Cart</Button>
        </motion.div>
       </AnimatePresence>
       </>
      )       
    }
  </>
  )


}
