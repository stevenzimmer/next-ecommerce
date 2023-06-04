import { stripe } from "./stripe";

export const getStripeProducts = async() => {
 

  const products = await stripe.products.list({
    active: true
  });

  const productsWithPrices = await Promise.all(
    products.data.map( async(product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency
      }
    })
  );
  return productsWithPrices;

}