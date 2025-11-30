import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import frontPicture from "../assets/img.svg"
import { useSelector } from "react-redux";
import Features from "../components/Features";

const Home = () =>{
  
  const {user} = useSelector((state)=> state.user);

  return (
       <motion.div
      className="home-wrapper"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{backgroundColor : "black" } }
    >
      <div className="upper" style={{display : "flex" , flexDirection : "row-reverse", marginTop : "30px"}}>
         <div className="left-wrapper" style={{}}>
        <img style={{width : "94vh" , padding : "40px"}} src= {frontPicture}></img>
      </div>
      <div style={{marginTop : "20px"}} className="right-wrapper">
         <motion.h1
        className="home-title"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{fontWeight: "800", color : "white", width : "40%"}}
      >
      The <span style={{color : "cadetblue"}}>easiest</span> way
      to do your expenses
      </motion.h1>

      <motion.p
        className="home-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{fontWeight : "700" , color : "white", display : "flex", justifyContent : "justify", marginTop : "30px", color : "cadetblue", fontSize : "1.3rem"}}
      >
        Track your income & expenses smartly. Stay financially aware!
      </motion.p>
      <motion.div
        className="home-btn-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {
          !user && (
            <>
              <Link to="/login" className="home-btn login-btn">Login</Link>
              <Link to="/register" className="home-btn register-btn">Register</Link>
            </>
          )
        }
      </motion.div>
      </div>
      </div>
      <div className="lower">
          {
        user && (
          <>
          <Features />
          </>
        )
      }
      </div>
    </motion.div>

   
  );
}

export default Home;
