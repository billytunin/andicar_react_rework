import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { isEmpty } from 'lodash'

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
    createFieldInValidationGroup: (state, action: PayloadAction<CreateFieldAction>) => {
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
    }
  }
})

export const {
  createValidationGroup,
  createFieldInValidationGroup,
  setValidationGroupDirtyState,
  setFieldInvalid,
  setFieldDirty,
  setFieldValidationMessage
} = validationInputsSlice.actions

export const getValidationGroups = (state: RootState) => state.validationInputs.validationGroups

export const validationGroupHasErrors = (validationGroupName: string) => (state: RootState) => {
  if(!isEmpty(state.validationInputs.validationGroups) && state.validationInputs.validationGroups[validationGroupName]) {
    let foundError = false
    for (let key in state.validationInputs.validationGroups[validationGroupName]) {
      foundError = state.validationInputs.validationGroups[validationGroupName][key].isInvalid
      if (foundError) {
        break
      }
    }
    return foundError
  } else {
    return false
  }
}

export default validationInputsSlice.reducer
