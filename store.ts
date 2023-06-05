import { create } from "zustand";
import { persist} from "zustand/middleware";

import { CartState } from "./types/Cart";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      paymentIntent: "",
      onCheckout: "cart",
      isOpen: false,
      toggleCart: () => set((state) => ({
        isOpen: !state.isOpen
      })),
      addProduct: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        console.log({existingItem});


        if(existingItem) {

          const updatedCart = state.cart.map((cartItem) => {

            if(cartItem.id === item.id) {
              return {...cartItem, quantity: cartItem.quantity! + 1}
            }

            return cartItem;

          })

          return { cart: updatedCart}
        } else {
          return { cart: [...state.cart, {
            ...item, quantity: 1
          }]}
        }

      }),
      removeProduct: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
          // console.log({existingItem});
  
          if(existingItem && existingItem.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if(cartItem.id === item.id) {
                return {...cartItem, quantity: cartItem.quantity! - 1}
              }
              return cartItem
            })
            return {cart: updatedCart}
          } else {
            // Remove Item from cart
            const filteredCart = state.cart.filter((cartItem) => cartItem.id !== item.id);
            return {cart: filteredCart}
          }
      }),
      setPaymentIntent: (val) => set((state) => ({paymentIntent:val})),
      setCheckout: (val) => set((state) => ({onCheckout: val}))
    }),
    
    { name: "cart-store"}
  )
)