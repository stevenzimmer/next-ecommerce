
import Product from '@/components/Product';

import { getStripeProducts } from '@/util/getStripeProducts';

export default async function Home() {
  const products = await getStripeProducts();

  // console.log({products});
  return (
    <main className="container">
      <div className='flex flex-wrap'>
    {products.map((product) => {
      return (
        <Product key={product.id} {...product} />
      )
    })}
    </div>
    </main>
  )
}
