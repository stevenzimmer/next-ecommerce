"use client"
import Image from "next/image"
import { useCartStore } from "@/store"
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5";
import formatPrice from "@/util/PriceFormat";


export default function Cart() {
  const cartStore = useCartStore();
  
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc +  item.unit_amount * item.quantity;
  }, 0);

  console.log({totalPrice});
  return (
    <div 
      className="fixed w-full h-screen inset-0 bg-black/25" 
      onClick={() => cartStore.toggleCart()}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 bottom-0 w-1/4 h-screen py-12 px-6 overflow-y-scroll drop-shadow-xl">

          <p className="mb-12">Your shopping Cart</p>
          {cartStore.cart.map((item) => {
            return(
            <div key={item.id} className="flex items-center py-4 gap-4">
              <div>
                <Image 
                  className="w-24 h-24 rounded-full border-4 border-slate-400 object-fit"
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                />
              </div>
              <div>
                <p>{item.name}</p>
               
                <p>quantity: {item.quantity}</p>
                <div className="flex items-center">
                  <div>
                    <button onClick={() => cartStore.removeProduct(item)}  className="text-red-500 text-xl">
                      <IoRemoveCircle />
                    </button>
                  </div>

                  <div>
                    <button onClick={() => cartStore.addProduct(item)} className="text-blue-500 text-xl">
                      <IoAddCircle />
                    </button>  
                  </div>
                
                </div>
                <div >
                Item Total: {formatPrice(item.unit_amount * item.quantity)}
              </div>
          
              </div>
             
            
            </div>
          )
        })}
      {cartStore.cart.length > 0 ? (
        <>
        <p className="mb-6">
        Cart Total: {formatPrice(totalPrice)}
        </p>
        <button className="py-2 bg-teal-700 w-full rounded-md text-white ">Checkout</button>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
        
       
      </div>
    </div>
  )
}