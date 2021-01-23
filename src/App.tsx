import React, { useState, useEffect } from 'react'
import SlideRoutes from 'react-slide-routes'
import { Route, useLocation } from 'react-router-dom'
import request from './utils/request'
import './App.css'
import {
  getInitialCheckState,
  setInitialCheck,
  userStateLogin,
  setIsAdmin,
  setSessionErrorId
} from './userStateSlice'
import { setCategorias } from './components/productos/productosSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import AppHeader from './components/app-header/AppHeader'
import Inicio from './components/inicio/Inicio'
import Productos from './components/productos/Productos'
import Contacto from './components/contacto/Contacto'
import SessionPage from './components/session-page/SessionPage'
import AppFooter from './components/app-footer/AppFooter'
import Spinner from './components/spinner/Spinner'

function App() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const location = useLocation()
  const pathList = ['/', '/productos', '/contacto', '/session']
  const [isLoading, setIsLoading] = useState(false)

  const initialCheck = useSelector(getInitialCheckState)

  useEffect(() => {
    /*
    initialSetup takes care of the asynchronous operations that need to ocurr before the app gets rendered.
    Such as verifying that the user has a valid token and loading the categorias array in the productosSlice store
    */
    const initialSetup = async () => {
      setIsLoading(true)
      const validToken = await checkTokenValidity()
      if (validToken) {
        await getCategoriasArray()
      }
      dispatch(setInitialCheck(true))
      setIsLoading(false)
    }

    const checkTokenValidity = async (): Promise<boolean> => {
      let success = false
      try {
        const resp: IsValidTokenBackendResponse = await request.get('/auth/isValidToken')
        dispatch(userStateLogin(resp.data.token))
        dispatch(setIsAdmin(resp.data.isAdmin))
        success = true
      } catch(error) {
        const errorId = (error.error && error.error.data && error.error.data.errorId) || null
        dispatch(setSessionErrorId(errorId))
      }

      return success
    }

    const getCategoriasArray = async () => {
      try {
        const getCategoriasResp: CategoriasBackendResponse = await request.get('/auth/getCategorias')
        dispatch(setCategorias(getCategoriasResp.data))
      } catch(error) {
        enqueueSnackbar(
          'Hubo un problema al intentar obtener las categorias.',
          { variant: 'error' }
        )
      }
    }

    if (!initialCheck) {
      initialSetup()
    }
  }, [initialCheck, dispatch, enqueueSnackbar])

  let appBody = 
    <div>
      <AppHeader />
      <div className="app-content">
        <SlideRoutes location={location} duration={500} pathList={pathList}>
          <Route path="/" component={Inicio} exact />
          <Route path="/productos" component={Productos} />
          <Route path="/contacto" component={Contacto} />
          <Route path="/session" component={SessionPage} />
        </SlideRoutes>
      </div>
    </div>

  if (isLoading) {
    appBody = <Spinner />
  }
  return (
    <div className="app">
      {appBody}
      <AppFooter />
    </div>
  )
}

export default App
