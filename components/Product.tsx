"use client"
import formatPrice  from "@/util/PriceFormat";
import { ProductTypes } from "@/types/ProductTypes";
export default function Product({name, description, price}:ProductTypes) {

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {price !== null ? formatPrice(price) : 'n/a'}
      </div>
      <div>
        {description}
      </div>
    </div>
  )
}