import React, { useState } from 'react'
import axios from '../../utils/axios'
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
import { setCategorias } from '../productos/productosSlice'
import { userStateLogin, setIsAdmin, userState } from '../../userStateSlice'
import styles from './LoginBox.module.css'

const VALIDATION_GROUP_NAME = 'loginForm'

export default function LoginBox() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({ user: '', pass: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorText, setErrorText] = useState('')

  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))
  const { sessionErrorId } = useSelector(userState)
  
  const login = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setIsLoading(true)
      try {
        const resp: LoginBackendResponse = await axios.post('/login', {
          user: loginData.user,
          pass: loginData.pass
        })
        dispatch(userStateLogin(resp.data.token))
        dispatch(setIsAdmin(resp.data.isAdmin))

        // Get categorias after logging in
        const getCategoriasResp: CategoriasBackendResponse = await axios.get('/auth/getCategorias')
        dispatch(setCategorias(getCategoriasResp.data))

        history.push('/productos')
      } catch(error) {
        const {
          message = 'Ocurrió un error al intentar hacer login. Por favor intente nuevamente'
        } = axios.getErrorBody(error)
        setErrorText(message)
        setIsLoading(false)
      }
    }
  }

  const handleLoginDataChange = (field: string, value: string) => {
    setErrorText('')
    setLoginData({ ...loginData, [field]: value })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      login()
    }
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
          onKeyPress={handleKeyPress}
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
          onKeyPress={handleKeyPress}
          onChange={(value) => handleLoginDataChange('pass', value)}
        />
        {
          errorText ?
            <div className={styles.alert}>
              <Alert severity='error'>
                {errorText}
              </Alert>
            </div>
            :
            ''
        }
        {
          !errorText && sessionErrorId && sessionErrorId === 'TokenExpiredError' ?
            <div className={styles.alert}>
              <Alert severity='warning'>
                Su sesión ha expirado. Por favor, vuelva a iniciar sesión
              </Alert>
            </div>
            :
            ''
        }
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