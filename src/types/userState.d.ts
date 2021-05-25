interface UserState {
  isLoggedIn: boolean
  isAdmin: boolean
  priceVisibility: boolean
  priceModifier: number
  sessionErrorId: string | null
  initialCheck: boolean
  isMobileVersion: boolean
}

interface UserStateLoginPayload {
  isAdmin: boolean
  priceVisibility: boolean
  priceModifier: number
  token: string
}