export type ProductTypes = {
  name: string
  description: string | null
  quantity?: number | 1
  unit_amount: number | null
  image: string
  id: string
}

type MetadataType = {
  features: string
}