import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma"

import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    id: string
  }
}
const fetchOrder = async (id) => {
  const user = await getServerSession(authOptions);
 
  console.log({user});

  if(user) {
    const order = await prisma.order.findUnique({
      where: {
        id
      },
      include: {
        products: true
      }
    });
    console.log({order});
    return {
      order,
      user: user.user
    };
  } else {
    // return;
    redirect("/");
  }
}

export default async function Order({params}): Props {
  const order = await fetchOrder(params.id);
  if(!order) {
    return <p>Loading...</p>
  }

  console.log(order?.order?.products);
  console.log(params.id);
  return (
    <div className="container">
      <div>
        <Link href="/dashboard">Back to dashboard</Link>
        <div>
          <h2 className="mb-6 font-bold">Order #{params.id}</h2>
          <div>
          <div>
            {
               new Intl.DateTimeFormat("en-us", {
                dateStyle: "long"
              }).format( new Date(order.order?.createdDate))
              
              }
            </div>
            <h3 className="mb-3 font-bold">Products</h3>
            
            <div className="flex flex-wrap -mx-6">
              {order.order.products.map( (product) => {
                return (
                  <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 px-6 mb-6">
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="mb-4 font-bold">{product.name}</h4>
                      <p className="mb-4">{product.description}</p>
                      <div>
                        {product.quantity}
                      </div>
                      <p className="mb-4">{product.unit_amount}</p>
                    </div>
                  </div>
                )
              } 
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
