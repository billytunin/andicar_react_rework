interface PaginadorConfigModalProps {
  isDisabled?: boolean
  paginado: number
  currentTotal: number
  handlePaginadoChange: (paginadoNumber: number) => void
  paginadorConfigModalText: string
}

interface PaginadorComponentProps extends PaginadorConfigModalProps {
  currentPagina: number
  handlePageChange: (pageNumber: number) => void
  isDisabled?: boolean
}

interface PaginadorProductosProps {
  isDisabled?: boolean
}