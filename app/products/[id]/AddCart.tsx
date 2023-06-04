"use client"
import { useCartStore } from "@/store"
import { useState } from "react"

import { AddCartType } from "@/types/Cart";

export default function AddCart({id, name, unit_amount, quantity, image}: AddCartType) {
  // console.log({props});
  const cartStore = useCartStore();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({id, name, unit_amount, quantity, image})
    setAdded(true);
    setTimeout(() => {
      setAdded(false)
    }, 500);

  }
  return (
    <>
      <button onClick={() => handleAddToCart()} className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">Add to Cart</button>
    </>
  )
}
