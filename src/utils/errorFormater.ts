export const errorIdIntoMessage = ({ errorId, customMessage }: errorIdIntoMessageArguments) => {
  if (errorId === 'JsonWebTokenError') {
    return 'Su sesión es inválida'
  } else if(errorId === 'NO_TOKEN_PROVIDED') {
    return 'Por favor, inicie sesión para acceder'
  } else if(errorId === 'TokenExpiredError') {
    return 'Su sesión ha expirado. Por favor, vuelva a iniciar sesión'
  } else {
    return customMessage
  }
}