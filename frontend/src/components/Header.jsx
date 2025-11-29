import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.user);

  const handleLogout = () => {
    // 🔐 Clear auth later
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">ExpenseTracker 💸</h2>

      <ul className="nav-links">
        <li><NavLink to="/" className="nav-item">Home</NavLink></li>
        <li><NavLink to="/dashboard" className="nav-item">Dashboard</NavLink></li>
        <li><NavLink to="/add-transaction" className="nav-item">Add</NavLink></li>
        <li><NavLink to="/transactions" className="nav-item">History</NavLink></li>
        <li><NavLink to="/reports" className="nav-item">Reports</NavLink></li>
        <li>
        {
          user ? (
            <NavLink to="/profile" className="login-btn">Profile</NavLink>
          ) : (
            <NavLink to="/auth" className="login-btn" onClick={handleLogout}>Login</NavLink>
          )
        }
        </li>
      </ul>
    </nav>
  );
}

export default Header;
