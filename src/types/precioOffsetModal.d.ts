interface PrecioOffsetModalState {
  isOpen: boolean
  productId: number
}

interface PrecioOffsetToggleModalAction {
  isOpen: boolean
  productId?: number
}

interface GetPrecioOffsetForAllUsersBackendResponse {
  data: PrecioOffsetData[]
}

interface PrecioOffsetData {
  user_id: number
  product_id: number
  offset: number
}

interface PrecioOffsetRowData {
  userId: number | string
  userName: string
  offset: number | string
}