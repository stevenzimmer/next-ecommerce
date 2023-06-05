import { getStripeProduct } from "@/util/getStripeProduct"
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";
type Props = {
  params: {
    id: string
  }
}

export default async function ProductPage({params}: Props) {
  const product = await getStripeProduct(params.id);
  // console.log({props});
  // console.log({product});
  return (
    <section >
      <div className="container mx-auto max-w-3xl px-6">
        {/* {params.id} */}
        <Image 
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-80 h-80 object-cover"
        />
        
        <h1>{product.name}</h1>
        <p className="mb-12">{product.unit_amount && formatPrice(product.unit_amount) }</p>
        <AddCart {...product} />
      </div>
    </section>
  )
}
