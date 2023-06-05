import {stripe} from "@/util/stripe"

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

import { prisma } from "@/lib/prisma"
import { AddCartType } from "@/types/Cart"

const calculateOrderAmount = (items) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  return totalPrice
}

export async function POST(req: Request) {
  // console.log(req.body);
  // const request = await req.json();
  // console.log({request})
;  const userSession = await getServerSession( authOptions);

  if (!userSession) {
    return NextResponse.json({ message: "You must be logged in." }, {
      status: 403
    });
  }

  

  const {items, payment_intent_id} = await req.json();

  const total = calculateOrderAmount(items);


  // Create Order Data
  const orderData = {
    user: {
      connection: {
        id: userSession.user?.id
      }
    },
    amount: total,
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity
      }))
    }
  }

  return NextResponse.json({
    message: 'Success',
  }, {
    status: 200
  })




}