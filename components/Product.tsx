"use client"
import formatPrice  from "@/util/PriceFormat";
import { ProductTypes } from "@/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
export default function Product({name, description, unit_amount, image, id}:ProductTypes) {

  return (
    <div className=" lg:w-1/2 px-6">
      <div className="border rounded bg-white">
      <Image 
        src={image}
        alt={name}
        width={400}
        height={400}
      className="w-80 h-80 object-cover"
      />
      <div className="p-6 bg-slate-100">
      <h2>{name}</h2>
      <div>
        {unit_amount && formatPrice(unit_amount) }
      </div>
      <div>
        {description}
      </div>
      <div>
        <Link href={`/products/${id}`}>Learn more</Link>
      </div>
      </div>
      </div>
    </div>
  )
}