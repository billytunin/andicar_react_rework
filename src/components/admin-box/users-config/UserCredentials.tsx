import React, { useState } from 'react'
import axios from '../../../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { cloneDeep } from 'lodash'

import Spinner from '../../spinner/Spinner'
import ValidationInput from '../../validation-input/ValidationInput'
import ValidatedFloatNumberField from '../../validated-number-field/ValidatedFloatNumberField'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../../validation-input/validationInputsSlice'

import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'

export default function UserCredentials(props: UserCredentialsProps) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const VALIDATION_GROUP_NAME = `userCredentialsForm${props.arrayIndex}`
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const [isSaving, setIsSaving] = useState(false)
  const [userObj, setUserObj] = useState<User>(cloneDeep(props.user))

  const save = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setIsSaving(true)
      try {
        const axiosCall = userObj.id ? axios.put : axios.post
        await axiosCall('/auth/user', {
          userObj
        })
        enqueueSnackbar(
          'Usuario guardado con éxito',
          { variant: 'success' }
        )
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
        if (props.finishedSaving) {
          props.finishedSaving()
        }
      } catch(error) {
        const {
          message = 'Hubo un problema al intentar guardar este usuario'
        } = axios.getErrorBody(error)
        enqueueSnackbar(
          message,
          { variant: 'error' }
        )
      } finally {
        setIsSaving(false)
      }
    }
  }

  const deleteUser = async () => {
    console.log('do delete user')
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <ValidationInput
          id={`userCredential-${props.arrayIndex}`}
          value={userObj.user}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          maxlength={25}
          label=''
          fullWidth
          icon={<AccountCircle />}
          onChange={(value) => setUserObj({ ...userObj, user: value })}
        />
      </Grid>
      <Grid item xs={3}>
        <ValidationInput
          id={`passCredential-${props.arrayIndex}`}
          value={userObj.password}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          maxlength={25}
          label=''
          fullWidth
          icon={<LockIcon />}
          onChange={(value) => setUserObj({ ...userObj, password: value })}
        />
      </Grid>
      <Grid item xs>
        <Grid container spacing={0} alignItems='center' className='fullHeight'>
          <Grid item xs>
            <Switch
              color='primary'
              checked={userObj.priceVisibility}
              onChange={(event) => setUserObj({ ...userObj, priceVisibility: event.target.checked })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <ValidatedFloatNumberField
          entityName='priceModifier'
          uniqueId={props.arrayIndex}
          label=''
          value={userObj.priceModifier}
          onChange={(value) => setUserObj({ ...userObj, priceModifier: value })}
          validationGroupName={VALIDATION_GROUP_NAME}
        />
      </Grid>
      <Grid item xs>
        <Grid container spacing={0} alignItems='center' className='fullHeight'>
          <Grid item xs>
            {
              isSaving ? <Spinner /> :
              <div>
                <IconButton
                  color='primary'
                  onClick={save}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  color='secondary'
                  onClick={deleteUser}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}