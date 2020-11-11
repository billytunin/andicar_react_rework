type severity = 'success' | 'error' | 'warning' | 'info'

interface ToastAlertState {
  open: boolean
  severity: severity
  text: string
}

interface OpenToastAction {
  severity: severity
  text: string
}