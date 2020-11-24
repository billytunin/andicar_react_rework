interface GetConsultasBackendResponse {
  data: Array<Consulta>
}

interface GetTotalConsultasBackendResponse {
  data: number
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