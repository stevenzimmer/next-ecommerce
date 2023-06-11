
export type CartItem = {
  name: string
  id: string
  image?: string[]
  unit_amount: number | null
  quantity: number
}

export type AddCartType = {
  name: string
  image?: string
  id: string
  quantity?: number | 1
  unit_amount: number | null
}

export type CartState = {
  isOpen: Boolean
  cart: AddCartType[]
  toggleCart: () => void
  addProduct: (item:AddCartType) => void
  removeProduct: (item:AddCartType) => void
  paymentIntent: string
  onCheckout: string
  setPaymentIntent: (val: string) => void
  setCheckoutStatus: (val: string) => void,
  clearCart: () => void
}
