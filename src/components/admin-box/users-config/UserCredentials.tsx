import React, { useState } from 'react'
import { cloneDeep } from 'lodash'

import Spinner from '../../spinner/Spinner'
import ValidationInput from '../../validation-input/ValidationInput'
import ValidatedFloatNumberField from '../../validated-number-field/ValidatedFloatNumberField'

import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'

export default function UserCredentials(props: UserCredentialsProps) {
  const VALIDATION_GROUP_NAME = `userCredentialsForm${props.arrayIndex}`
  const [isSaving, setIsSaving] = useState(false)
  const [userObj, setUserObj] = useState<User>(cloneDeep(props.user))

  const save = async () => {
    console.log('do the save')
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
              <IconButton
                color='primary'
                onClick={save}
              >
                <SaveIcon />
              </IconButton>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}