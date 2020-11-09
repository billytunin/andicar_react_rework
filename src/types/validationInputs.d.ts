interface CreateValidationGroupAction {
  name: string
}

interface CreateFieldAction {
  name: string
  isInvalid: boolean
  validationGroupName: string
}

interface SetFieldPropertyAction {
  name: string
  field: string
  value: boolean
}

interface SetFieldValidationMessageAction {
  name: string
  field: string
  value: string | undefined
}

interface SetValidationGroupDirtyStateAction {
  isDirty: boolean
  validationGroupName: string
}