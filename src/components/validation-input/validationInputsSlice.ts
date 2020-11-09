import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

// TODO: Type-ear esto bien
const initialState: any = {
  validationGroups: {}
}

export const validationInputsSlice = createSlice({
  name: 'validationInputs',
  initialState,
  reducers: {
    createValidationGroup: (state, action: PayloadAction<CreateValidationGroupAction>) => {
      state.validationGroups[action.payload.name] = {}
    },
    createFieldOnValidationGroup: (state, action: PayloadAction<CreateFieldAction>) => {
      state.validationGroups[action.payload.validationGroupName][action.payload.name] = {
        isInvalid: action.payload.isInvalid,
        isDirty: false
      }
    },
    setValidationGroupDirtyState: (state, action: PayloadAction<SetValidationGroupDirtyStateAction>) => {
      if (state.validationGroups[action.payload.validationGroupName]) {
        for (let field in state.validationGroups[action.payload.validationGroupName]) {
          state.validationGroups[action.payload.validationGroupName][field].isDirty = action.payload.isDirty
        }
      }
    },
    setFieldInvalid: (state, action: PayloadAction<SetFieldPropertyAction>) => {
      state.validationGroups[action.payload.name][action.payload.field].isInvalid = action.payload.value
    },
    setFieldDirty: (state, action: PayloadAction<SetFieldPropertyAction>) => {
      state.validationGroups[action.payload.name][action.payload.field].isDirty = action.payload.value
    },
    setFieldValidationMessage: (state, action: PayloadAction<SetFieldValidationMessageAction>) => {
      state.validationGroups[action.payload.name][action.payload.field].validationMessage = action.payload.value
    },
  }
})

export const {
  createValidationGroup,
  createFieldOnValidationGroup,
  setValidationGroupDirtyState,
  setFieldInvalid,
  setFieldDirty,
  setFieldValidationMessage
} = validationInputsSlice.actions

export const getValidationGroups = (state: RootState) => state.validationInputs.validationGroups

export default validationInputsSlice.reducer
