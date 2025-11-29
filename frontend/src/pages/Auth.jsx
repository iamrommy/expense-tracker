import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.css";
import frontPicture from "../assets/img.svg"

const Auth = () =>{
  
  return (
       <motion.div
      className="auth-wrapper"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{backgroundColor : "black" , height : "88vh"} }
    >
      <div className="left-wrapper" style={{}}>
        <img src= {frontPicture}></img>
      </div>
      <div className="right-wrapper">
         <motion.h1
        className="auth-title"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{fontWeight: "800", color : "white", width : "70%"}}
      >
      The <span style={{color : "cadetblue"}}>easiest</span> way
      to do your expenses
      </motion.h1>

      <motion.p
        className="auth-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{fontWeight : "700" , color : "white", display : "flex", justifyContent : "justify", marginTop : "30px"}}
      >
        Track your income & expenses smartly. Stay financially aware!
      </motion.p>
      <motion.div
        className="auth-btn-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/login" className="auth-btn login-btn">
          Login
        </Link>
        <Link to="/register" className="auth-btn register-btn">
          Register
        </Link>
      </motion.div>
      </div>
    </motion.div>

   
  );
}

export default Auth;
