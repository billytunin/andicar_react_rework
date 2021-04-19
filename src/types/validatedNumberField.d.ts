interface ValidatedNumberFieldProps {
  bindedValueChanged: (newValue: string, isInvalid: boolean) => void
  enterKeyPressed?: () => void
  maxNumber: number
  bindedValue: string
  isDisabled?: boolean
}