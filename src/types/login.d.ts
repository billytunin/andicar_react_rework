interface LoginBackendResponse {
  data: {
    token: string,
    isAdmin: boolean,
    priceModifier: number,
    priceVisibility: boolean
  }
}

interface IsValidTokenBackendResponse extends LoginBackendResponse {}