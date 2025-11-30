const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/`

// AUTH ENDPOINTS
export const endpoints = {
  REGISTER_API: BASE_URL + "auth/register",
  LOGIN_API: BASE_URL + "auth/login",
  TRANSACTIONS_API: BASE_URL + "transactions",
  MONTHLY_GOAL_API: BASE_URL + "user/monthly-goal"
}