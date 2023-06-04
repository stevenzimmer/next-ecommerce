
export type CartItem = {
  name: string
  id: string
  images?: string[]
  unit_amount: number
  quantity: number
}

export type AddCartType = {
  name: string
  image: string
  id: string
  quantity?: number | 1
  unit_amount: number | null
}

export type CartState = {
  isOpen: Boolean
  cart: CartItem[]
  toggleCart: () => void
  addProduct: (item:AddCartType) => void
  removeProduct: (item:AddCartType) => void
  paymentIntent: string
  onCheckout: string
  setPaymentIntent: (val: string) => void
  setCheckout: (val: string) => void
}
