interface GetConsultasBackendResponse {
  data: {
    items: Array<Consulta>
    total: number
  }
}

interface Consulta {
  id: number
  nombreCompleto: string
  email: string
  telefono?: string
  consulta: string
  archivado: boolean
  fecha: string
}

interface ConsultaBoxProps extends Consulta {
  showActiveConsultasMode: boolean
  removeConsultaFromSelected: (consultaId: number) => void
  addConsultaToSelected: (consultaId: number) => void
}