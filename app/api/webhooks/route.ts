import { Stripe } from "stripe";
import {stripe} from "@/util/stripe"
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "@/lib/prisma"
import { buffer } from "node:stream/consumers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const rawBody = await buffer(req.body);

  console.log({rawBody});

  const headersList = headers();

  const sig = headersList.get('stripe-signature');

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if(!sig) {
    return NextResponse.json({ message: "Missing Stripe Signature" }, {
      status: 403
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!);

    console.log({event});

  } catch (error) {
    console.log({error});

    return NextResponse.json({ message: "Webhook Error" }, {
      status: 400
    });
  }

  switch (event.type) {
    case "payment_intent.created":
      console.log("PaymentIntent was created!");

      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log({paymentIntent});
      
      console.log("PaymentIntent was created!");
      
      break;
    
    case "charge.succeeded":
      console.log("Charge was successful!");

        const charge = event.data.object as Stripe.Charge;

        console.log({charge});

        if(typeof charge.payment_intent === "string") {
          const order = await prisma.order.update({
            where: {
              paymentIntentID: charge.payment_intent
            },
            data: {
              status: "paid"
            }
          })
        }
        console.log("Charge was successful!");
        
        break;
  
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true }, {
    status: 200
  });
} 