interface FormularioState {
  nombreCompleto: string
  email: string
  telefono: string
  consulta: string
}

interface SetValueAction {
  field: string
  value: string
}