interface PaginadorConfigModalProps {
  paginado: number
  currentTotal: number
  handlePaginadoChange: (paginadoNumber: number) => void
  paginadorConfigModalText: string
}

interface PaginadorComponentProps extends PaginadorConfigModalProps {
  currentPagina: number
  handlePageChange: (pageNumber: number) => void
}