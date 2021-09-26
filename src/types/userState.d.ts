interface UserState {
  isLoggedIn: boolean
  isAdmin: boolean
  sessionErrorId: string | null
  initialCheck: boolean
  isMobileVersion: boolean
}

interface UserStateLoginPayload {
  isAdmin: boolean
  token: string
}