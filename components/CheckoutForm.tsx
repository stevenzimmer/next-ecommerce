"use client"
import { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

import formatPrice from "@/util/PriceFormat";
import { Button } from "./ui/button";
import { useCartStore } from "@/store";
export default function CheckoutForm({clientSecret}: {clientSecret: string}) {
  console.log({clientSecret});
  const stripe = useStripe();
  console.log({stripe})
  const elements = useElements();

  console.log({elements});
  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  useEffect(() => {
    //  Create payment intent as soon as page loads
    if(!stripe) {
      return
    }

    if(!clientSecret) { 
      return;
    }
  },[stripe, clientSecret]);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe.confirmPayment({
      elements,
      redirect: "if_required" 
    }).then((res) => {
      console.log({res});
      
      if(res.error) {
        console.log(res.error);
        setIsLoading(false);
      }
      if(res.paymentIntent?.status === "succeeded") {
        cartStore.setCheckoutStatus("success");
        cartStore.clearCart();
        cartStore.setPaymentIntent("");
        setIsLoading(false);
      }
    });
  }

  const formattedPrice = formatPrice(totalPrice);

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{
        layout: "tabs"
      }} />
      <p className="my-6">
        Checkout Total: {formattedPrice}</p>
      <Button className="w-full bg-teal-600 disabled:opacity-25 text-white hover:bg-teal-700" id="submit" type="submit" disabled={isLoading || !stripe || !elements}>
        <span>
          {isLoading ? "Processing..." : "Pay now"}
        </span>
      </Button>
      
    </form>
  )
}
