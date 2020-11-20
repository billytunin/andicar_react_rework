interface LoginBackendResponse {
  data: {
    token: string,
    isAdmin: boolean
  }
}