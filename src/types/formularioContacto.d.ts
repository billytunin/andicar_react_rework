interface FormularioState {
  nombreCompleto: string | null
  email: string | null
  telefono: string | null
  consulta: string | null
}

interface SetValueAction {
  field: string
  value: string
}