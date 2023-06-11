"use client"
import Image from "next/image"
import { useCartStore } from "@/store"
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5";
import formatPrice from "@/util/PriceFormat";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import { useToast } from "@/components/ui/use-toast";
import { PackageOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import Success from "@/components/Success";


export default function Cart() {
  const cartStore = useCartStore();
  
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc +  item.unit_amount! * item.quantity!;
  }, 0);

  const { toast } = useToast()

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}

      exit={{opacity: 0}}

      className="fixed w-full h-screen inset-0 bg-black/25" 
      onClick={() => {
        cartStore.toggleCart();
        cartStore.setCheckoutStatus("cart");
        }
      }>
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 bottom-0 w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/4 h-screen py-12 px-6 overflow-y-scroll drop-shadow-xl">

          
          {cartStore.onCheckout === "cart" && cartStore.cart.length > 0 && (
            <>
            <p className="mb-6">Your shopping Cart</p>
          {cartStore.cart.map((item) => {
       
            return(
            <motion.div
              layout
              key={item.id} className="flex items-center py-4 gap-4">
               
              <Image 
                src={item.image}
                className="w-24 h-24 rounded-full border-4 border-slate-400 object-fit"
                alt={item.name}                
                width={100}
                height={100}
              />
           
              <div>
                <p>{item.name}</p>
               
                <p>quantity: {item.quantity}</p>
                <div className="flex items-center">

                  <button onClick={() => {
                    console.log("remove item");

                    cartStore.removeProduct(item);
                    toast({
                      title: "Scheduled: Catch up ",
                      description: "Friday, February 10, 2023 at 5:57 PM",
                      
                    })
                  }}  className="text-red-500 text-xl">
                    <IoRemoveCircle />
                  </button>
                  <button onClick={() => cartStore.addProduct(item)} className="text-blue-500 text-xl">
                    <IoAddCircle />
                  </button>  
                
                </div>
                <div>
                Item Total: {formatPrice(item.unit_amount! * item.quantity!)}
                </div>
          
              </div>
            </motion.div>
          )
        })}
         <p className="mb-6">
           Cart Total: {formatPrice(totalPrice)}
        </p>
        <Button className="py-2 bg-teal-700 w-full rounded-md text-white hover:bg-teal-500" onClick={() => cartStore.setCheckoutStatus("checkout")}>Take me to Checkout</Button>
        </>
          )}
      {cartStore.cart.length > 0 ? (
        
        <>
      
        {cartStore.onCheckout === "checkout" && <Checkout />}
        </>
        
      ) : (
        <>
        {cartStore.onCheckout !== "success" && (
          <AnimatePresence>
          <Alert>
            <PackageOpen className="h-4 w-4 stroke-red-500" />
            <AlertTitle className="">Cart is empty</AlertTitle>
            <AlertDescription>
            Add Items to your cart to continue...

            </AlertDescription>
          </Alert>
   
        </AnimatePresence>
        )}
        </>
        
      )}

      {cartStore.onCheckout === "success" && <Success />}
        
        
      </motion.div>
    </motion.div>
  )
}