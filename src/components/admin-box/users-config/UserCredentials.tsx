import React from 'react'
import { useSelector } from 'react-redux'
import ValidationInput from '../../validation-input/ValidationInput'
import ValidatedFloatNumberField from '../../validated-number-field/ValidatedFloatNumberField'

import { userState } from '../../../userStateSlice'

import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'

export default function UserCredentials(props: UserCredentialsProps) {
  const { isMobileVersion } = useSelector(userState)

  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <ValidationInput
          id={`userCredential-${props.user.id}`}
          value={props.user.user}
          validationGroupName={props.validationGroupName}
          required
          maxlength={25}
          label=''
          fullWidth
          icon={isMobileVersion ? undefined : <AccountCircle />}
          onChange={(value) => props.modifyUser({ ...props.user, user: value })}
        />
      </Grid>
      <Grid item xs={3}>
        <ValidationInput
          id={`passCredential-${props.user.id}`}
          value={props.user.password}
          validationGroupName={props.validationGroupName}
          required
          maxlength={25}
          label=''
          fullWidth
          icon={isMobileVersion ? undefined : <LockIcon />}
          onChange={(value) => props.modifyUser({ ...props.user, password: value })}
        />
      </Grid>
      <Grid item xs>
        <Grid container spacing={0} alignItems='center' className='fullHeight'>
          <Grid item xs>
            <Switch
              color='primary'
              checked={props.user.priceVisibility}
              onChange={(event) => props.modifyUser({ ...props.user, priceVisibility: event.target.checked })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <ValidatedFloatNumberField
          entityName='priceModifier'
          uniqueId={props.user.id}
          label=''
          value={props.user.priceModifier}
          onChange={(value) => props.modifyUser({ ...props.user, priceModifier: value })}
          validationGroupName={props.validationGroupName}
        />
      </Grid>
      <Grid item xs>
        <Grid container spacing={0} alignItems='center' className='fullHeight'>
          <Grid item xs>
            {
              props.isCreateUser ?
              <IconButton
                color='secondary'
                onClick={() => props.deleteUser(props.user.id)}
              >
                <DeleteIcon />
              </IconButton>
              :
              <Switch
                color='secondary'
                checked={props.markedAsDelete}
                onChange={() => props.deleteUser(props.user.id)}
              />
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}