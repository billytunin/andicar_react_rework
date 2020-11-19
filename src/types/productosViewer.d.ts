interface ProductosViewerState {
  isOpen: boolean,
  productoIndex: number
}

interface OpenProductosViewerAction {
  isOpen: boolean,
  productoIndex?: number
}