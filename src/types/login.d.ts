interface LoginBackendResponse {
  data: {
    token: string,
    isAdmin: boolean
  }
}

interface IsValidTokenBackendResponse extends LoginBackendResponse {}