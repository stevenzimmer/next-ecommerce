"use client"
import { Session } from "next-auth";
import {signIn, signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import {AiFillShopping} from "react-icons/ai"
import {motion, AnimatePresence } from "framer-motion"

export default function Nav({user, expires}:Session) {
  const cartStore = useCartStore();
  return (
    <nav className="py-6 bg-slate-200">
      <div className="container px-6 md:px-12">
      <div className="flex justify-between items-center">

      
      <Link href="/">Styled</Link>
      <ul className="flex items-center gap-6 md:gap-12">
       
        {!user && (
          <li>
            <button className="btn bg-teal-400 border-teal-500" onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <>
          <li>
            <Image 
              src={user.image!}
              width={32}
              height={32}
              alt={user.name!}
              className="rounded-full"
            />
          </li>
          <li 
          onClick={() => cartStore.toggleCart()}
          className="text-3xl text-teal-500 flex items-end">
            <AiFillShopping />
            <AnimatePresence>
            {cartStore.cart.length > 0 && (

              <motion.span animate={{scale: 1}} initial={{scale:0}} className=" bg-teal-700 text-white text-lg font-bold w-6 h-6 rounded-full text-center flex items-center justify-center">{cartStore.cart.length}</motion.span>
            
            )}
            </AnimatePresence>
          </li>
          <li>
            <button className="btn bg-amber-700 border-amber-800" onClick={() => signOut()}>Sign Out</button>
          </li>
          </>
        )}
      
      </ul>
      
      </div>
      <AnimatePresence>
        {cartStore.isOpen && <Cart />}
      </AnimatePresence>
      </div>
    </nav>
  )
}