import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { SetMonthlyGoal } from '../services/operations/userAPI';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.user);

  const [isDisabled, setIsDisabled] = useState(false);

  const [monthlyGoal, setMonthlyGoal] = useState("");

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

 const handleSubmit = () => {
    setIsDisabled(true);
    // console.log("Current Monthly Goal:", monthlyGoal);

    dispatch(
      SetMonthlyGoal(
        token, monthlyGoal, ()=> setIsDisabled(false)
      )
    )

    setMonthlyGoal("");
  };
  
  const cadetBlue = "#5F9EA0";

  const wrapper = {
    minHeight: "100vh",
    padding: "0",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
  };

  const card = {
    width: "460px",
    background: "linear-gradient(145deg, rgba(25,25,25,1), rgba(10,10,10,1))",
    borderRadius: "18px",
    padding: "30px",
    textAlign: "center",
    boxShadow: `0 0 30px ${cadetBlue}55`,
    backdropFilter: "blur(5px)",
    transition: "0.3s",
  };

  const avatar = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "0 auto",
    border: `3px solid ${cadetBlue}`,
    boxShadow: `0 0 20px ${cadetBlue}66`,
  };

  const nameStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginTop: "18px",
    color: "#FFFFFF",
    textShadow: `0 0 8px ${cadetBlue}55`,
  };

  const emailStyle = {
    fontSize: "13px",
    color: "#c9c9c9",
    marginTop: "4px",
  };

  const divider = {
    width: "70%",
    margin: "20px auto",
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${cadetBlue}, transparent)`,
  };

  const statRow = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
  };

  const statCard = {
    flex: 1,
    margin: "0 6px",
    padding: "12px 10px",
    borderRadius: "10px",
    background: "#111",
    border: `1px solid ${cadetBlue}80`,
    boxShadow: `0 0 10px ${cadetBlue}33`,
  };

  const statNumber = {
    fontSize: "22px",
    fontWeight: "700",
    color: cadetBlue,
  };

  const statLabel = {
    fontSize: "11px",
    color: "#bfbfbf",
    letterSpacing: "0.5px",
    marginTop: "2px",
  };

  const logoutBtn = {
    marginTop: "28px",
    padding: "12px 28px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "10px",
    background: `linear-gradient(90deg, ${cadetBlue}, #6fb4b6)`,
    border: "none",
    cursor: "pointer",
    boxShadow: `0 0 15px ${cadetBlue}66`,
    transition: "0.3s",
    color: "#000",
  };

  const logoutHover = {
    transform: "scale(1.08)",
    boxShadow: `0 0 25px ${cadetBlue}99`,
  };

  const [hover, setHover] = React.useState(false);

  return (
    <div style={wrapper}>
      <div style={card}>
        {/* avatar */}
        <img
          style={avatar}
          src={`https://ui-avatars.com/api/?name=${user?.username}&background=111111&color=5F9EA0`}
          alt="profile avatar"
        />

        <h2 style={nameStyle}>
          {user?.username || "User"}
        </h2>

        <p style={emailStyle}>{user?.email || "Email unavailable"}</p>

        <div style={divider}></div>

        <div style={statRow}>
          <div style={statCard}>
            <div style={statNumber}>52K</div>
            <div style={statLabel}>Total Income</div>
          </div>
          <div style={statCard}>
            <div style={statNumber}>34K</div>
            <div style={statLabel}>Total Expense</div>
          </div>
          <div style={statCard}>
            <div style={statNumber}>128</div>
            <div style={statLabel}>Transactions</div>
          </div>
        </div>

      <div className="goal-section">
        <h3>Set Monthly Limit</h3>

        <input
          type="number"
          className="goal-input"
          placeholder="Enter amount"
          value={monthlyGoal}
          onChange={(e) => setMonthlyGoal(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={isDisabled}>
          Set
        </button>
      </div>       
        
        <button
          style={hover ? { ...logoutBtn, ...logoutHover } : logoutBtn}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
};

export default Profile;
