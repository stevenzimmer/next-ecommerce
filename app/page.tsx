import Image from 'next/image'
import Stripe from "stripe";
import Product from '@/components/Product';

const getStripeProducts = async() => {
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!, {
    apiVersion: "2022-11-15"
  });

  const products = await stripe.products.list({
    active: true
  });
  // console.log({products});

  const productsWithPrices = await Promise.all(
    products.data.map( async(product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency
      }
    })
  );
  return productsWithPrices;

}

export default async function Home() {
  const products = await getStripeProducts();

  console.log({products});
  return (
    <main className="container">
    {products.map((product) => {
      return (
        <Product key={product.id} {...product} />
      )
    })}
    </main>
  )
}
