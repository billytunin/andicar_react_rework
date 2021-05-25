interface User {
  id: number | string,
  user: string,
  password: string,
  priceVisibility: boolean
  priceModifier: number | string
}

interface GetUsersBackendResponse {
  data: User[]
}

interface UserCredentialsProps {
  user: User
  markedAsDelete?: boolean
  isCreateUser?: boolean
  validationGroupName: string
  modifyUser: (userObj: User) => void
  deleteUser: (userId: string | number) => void
}