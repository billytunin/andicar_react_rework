interface User {
  id?: number,
  user: string,
  password: string,
  priceVisibility: boolean
  priceModifier: number | string
}

interface GetUsersBackendResponse {
  data: User[]
}

interface UserCredentialsProps {
  user: User,
  arrayIndex: number,
  finishedSaving?: () => void
}