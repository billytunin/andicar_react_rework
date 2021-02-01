interface ImageToUpload {
  file: File
  productID: number
}

interface NewProductoProps {
  producto: Producto
  validationGroupName: string
  modificarNewProducto: ({ value, field, id }: ModificarNewProductoArguments) => void
  agregarImagen: (file: File, productID: number) => void
  newImages: Array<ImageToUpload>
  removerNewProducto: (id: number) => void
}

interface UploadImageButtonProps {
  productID: number
  agregarImagen: (file: File) => void
  newImages: Array<ImageToUpload>
}

interface UploadedImage {
  originalName: string
  newName: string
}

interface UploadImagesResponse {
  data: Array<UploadedImage>
}