interface UserState {
  isLoggedIn: boolean
  isAdmin: boolean
  sessionErrorId: string | null
  initialCheck: boolean
}

interface SetStateAction {
  isLoggedIn?: boolean
  isAdmin?: boolean
  sessionErrorId?: string | null
}