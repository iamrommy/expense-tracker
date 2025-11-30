import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import bg from "../assets/bg_f1_homepage.png";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    // 🔐 Clear auth later
    navigate("/");
  };

  const handleClick =  () =>{
    navigate("/");
  }

  return (
    <div className="navbar">
      <h2 onClick = {handleClick} className="logo">Expensify</h2>

      <ul className="nav-links">
        {user ? (
          <>
            <li><NavLink to="/" className="nav-item">Home</NavLink></li>
            <li><NavLink to="/add-transaction" className="nav-item">Add</NavLink></li>
            <li><NavLink to="/transactions" className="nav-item">History</NavLink></li>
            <li><NavLink to="/reports" className="nav-item">Reports</NavLink></li>
          </>
        ) : (
          <></>
        )}

        <li>
          {user ? (
            <NavLink to="/profile" className= "nav-item">Dashboard</NavLink>
          ) : (
            <></>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
