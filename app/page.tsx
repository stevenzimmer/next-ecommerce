import Product from '@/components/Product';

import { getStripeProducts } from '@/util/getStripeProducts';

export default async function Home() {
  const products = await getStripeProducts();

  return (
    <main className="container">
      <div className='flex flex-wrap max-w-4xl mx-auto'>
      {products.map((product) => {
        console.log({product})
        return (
          <Product key={product.id} {...product} />
        )
      })}
      </div>
    </main>
  )
}
