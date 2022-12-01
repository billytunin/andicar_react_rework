interface ProductConfigPorUsuarioModalState {
  isOpen: boolean
  productId: number
}

interface ProductConfigPorUsuarioToggleModalAction {
  isOpen: boolean
  productId?: number
}

interface GetProductConfigPorUsuarioForAllUsersBackendResponse {
  data: ProductConfigPorUsuarioData[]
}

interface ProductConfigPorUsuarioData {
  user_id: number
  product_id: number
  offset: number
  hidden?: boolean
}

interface ProductConfigPorUsuarioRowData {
  userId: number | string
  userName: string
  offset: number | string
  hidden?: boolean
  modifiedRow: boolean
}