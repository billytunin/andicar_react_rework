interface NewProductoProps {
  producto: Producto
  validationGroupName: string
  modificarNewProducto: ({ value, field, id }: ModificarNewProductoArguments) => void
  removerNewProducto: (id: number) => void
}

interface UploadImageBoxProps {
  productID: number
  productImagen: string
  emitSavedImage: (fileName: string) => void
}

interface UploadedImage {
  originalName: string
  newName: string
}

interface UploadImagesResponse {
  data: Array<UploadedImage>
}