import React, { useState } from 'react'
import request from '../../utils/request'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import ValidationInput from '../validation-input/ValidationInput'
import Alert from '@material-ui/lab/Alert'
import Spinner from '../spinner/Spinner'
import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'
import { setState } from '../../userStateSlice'
import styles from './LoginPage.module.css'

const VALIDATION_GROUP_NAME = 'loginForm'

export default function LoginPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({ user: '', pass: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorText, setErrorText] = useState('')

  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))
  
  const login = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setIsLoading(true)
      try {
        const resp: LoginBackendResponse = await request.post('/login', {
          user: loginData.user,
          pass: loginData.pass
        })
        request.setAuthToken(resp.data.token)
        dispatch(
          setState({
            isLoggedIn: true,
            isAdmin: resp.data.isAdmin
          })
        )
        history.push('/productos')
      } catch(error) {
        setErrorText(
          error.error && error.error.data ?
            error.error.data.message :
            'Ocurrió un error al intentar hacer login. Por favor intente nuevamente'
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleLoginDataChange = (field: string, value: string) => {
    setErrorText('')
    setLoginData({ ...loginData, [field]: value })
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className={styles.container}>
        <ValidationInput
          id="user"
          value={loginData.user}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          maxlength={25}
          label="Usuario"
          icon={<AccountCircle />}
          fullWidth
          onChange={(value) => handleLoginDataChange('user', value)}
        />
        <ValidationInput
          id="pass"
          value={loginData.pass}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          maxlength={25}
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          useShowPasswordAdornment
          showPassword={showPassword}
          handleClickShowPassword={() => setShowPassword(!showPassword)}
          icon={<LockIcon />}
          fullWidth
          onChange={(value) => handleLoginDataChange('pass', value)}
        />
        {errorText ? <Alert severity='error'>{errorText}</Alert> : ''}
        <Button
          onClick={login}
          variant="contained"
          color="primary"
        >
          Ingresar
        </Button>
      </div>
    )
  }
}