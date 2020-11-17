interface Categoria {
  id: string
  titulo: string
}

interface CategoriasBackendResponse {
  data: Array<Categoria>
}