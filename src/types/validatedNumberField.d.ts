interface CallToActionButtonProps {
  handleClick: () => void
  errorOnInternalValue: boolean
}

interface ValidatedNumberFieldProps {
  handleClick: (value: number) => void
  maxNumber: number
  bindedValue: string
}