import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {stripe} from "@/util/stripe";
import { prisma } from "@/lib/prisma"
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
const fetchUserInfo = async () => {
  const user = await getServerSession(authOptions);
 
  console.log({user});
  
  if(user) {

    const customer = await stripe.customers.retrieve(
      user.user?.stripeCustomerId!
      );

    const orders = await prisma.order.findMany({
      where: {
        user: {
          id: user?.user?.id
        },
        status: {
          in: [
            "paid",
          ]
        }
      },
      include: {
        products: true
      }
    });
    // console.log({orders});
    return {
      orders,
      user: user.user,
      customer
    };
  } else {
    // return;
    redirect("/");
  }
}


export default async function Dashboard() {

  const {orders, user, customer} = await fetchUserInfo();
  // console.log({orders});
  console.log({user});
  console.log({customer});

 
  return (
    <div className="container">
      <Image src={user.image} className="rounded-full mx-auto mb-6" width={200} height={200} alt={user.name} />
      <h1 className="text-center font-bold text-xl">{user.name} Dashboard</h1>
  
      {orders.length === 0 && <p className="text-center">You have no orders yet.</p>}
      {orders.length > 0 && (
        <>
        <p className="text-center">You have {orders.length} orders.</p>
        <div>
        <h2 className="mb-6 font-bold">Past Orders</h2>
        <div className="flex flex-wrap -mx-6">

        
        {orders.map( (order) => {
          return (
            <div className="lg:w-1/3 px-6 mb-12" key={order.id}>
              <h3>Order reference # <Link href={`/orders/${order.id}`}>{order.id}</Link></h3>
              <p>Date: {
               new Intl.DateTimeFormat("en-us", {
                dateStyle: "long"
              }).format( new Date(order.createdDate))
              
              }</p>
              {/* <p className="mb-3">
                Status: {order.status}
              </p> */}
              <ul className="">
                {order.products.map((product) => {
                  return (
                    <li className="mb-3 " key={product.id}>
                      {product.name} x {product.quantity}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        </div>
  
      </div>
        </>
      ) }
      
    </div>
  )
}
