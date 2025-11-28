import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

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
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Header;
