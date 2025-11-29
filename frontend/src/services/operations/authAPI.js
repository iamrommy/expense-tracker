import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"
import { setToken, setUser } from "../../redux/slices/userSlice";

const {
    LOGIN_API, 
    REGISTER_API
} = endpoints;

export function Signup({username, email, password, navigate}) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", REGISTER_API, {
        username,
        email,
        password
      })

      // console.log("REGISTER API RESPONSE............", response)

      if (response.status !== 200) {
        throw new Error("SignUp Failed")
      }

      toast.success("Registered Succesfully")
      dispatch(setToken(response.data.token))
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/")
      
    } catch (error) {
      // console.log("REGISTER API ERROR............", error)

      const message = error?.response?.data?.message;

      if(message === "Username already taken" || message === "User with email already exists"){
        toast.error(message);
      }
      else{
        toast.error("Login Failed")
      }

      navigate("/register")
    }
    toast.dismiss(toastId)
  }
}

export function login({email, password, navigate}) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password
      })

      // console.log("LOGIN API RESPONSE............", response)

      if (response.status !== 200) {
        throw new Error("LogIn Failed")
      }
      toast.success("Logged In Succesfully")

      dispatch(setToken(response.data.token))
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      navigate("/")
      
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)

      const message = error?.response?.data?.message;

      if(message === "User not found" || message === "Invalid credentials"){
        toast.error(message);
      }
      else{
        toast.error("Login Failed")
      }
      navigate("/login")
    }
    toast.dismiss(toastId)
  }
}
