export type ProductTypes = {
  name: string
  description: string
  quantity: number | 1
  unit_amount: number | null,
  image: string,
  id: string
  metadata: MetadataType
}

type MetadataType = {
  features: string
}