"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store"
export default function Success() {
  const cartStore = useCartStore();
  useEffect(() => {
    // Clear cart
    cartStore.clearCart();
    cartStore.setPaymentIntent("");
  }, []);

  return (
    <div>
      <p>Your order has been placed</p>
      <p>Check your email for the receipt.</p>
      <Link href="/dashboard">Check your order</Link>
    </div>
  )
}
