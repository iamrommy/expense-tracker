const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/auth/`

// AUTH ENDPOINTS
export const endpoints = {
  REGISTER_API: BASE_URL + "register",
  LOGIN_API: BASE_URL + "login",
}