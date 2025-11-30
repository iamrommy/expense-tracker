import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { SetMonthlyGoal } from '../services/operations/userAPI';

const Profiles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.user);

  const [isDisabled, setIsDisabled] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState("");

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const cadetBlue = "#5F9EA0";

  const wrapper = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
  };

  const card = {
    width: "480px",
    padding: "35px 30px",
    background: "linear-gradient(160deg, #0e0e0e, #050505)",
    borderRadius: "20px",
    boxShadow: `0 0 28px ${cadetBlue}55`,
    textAlign: "center",
    backdropFilter: "blur(5px)",
  };

  const avatar = {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: `2px solid ${cadetBlue}`,
    margin: "12px auto",
    boxShadow: `0 0 18px ${cadetBlue}88`,
  };

  const nameStyle = {
    fontSize: "30px",
    fontWeight: "800",
    color: cadetBlue,
    marginTop: "14px",
    textShadow: `0 0 10px ${cadetBlue}55`,
  };

  const emailStyle = {
    fontSize: "13px",
    color: "#dcdcdc",
    marginTop: "10px",
  };

  const divider = {
    height: "1px",
    width: "70%",
    margin: "22px auto",
    background: `linear-gradient(90deg, transparent, ${cadetBlue}, transparent)`,
  };

  const statRow = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "22px",
    gap: "8px",
  };

  const statCard = {
    flex: 1,
    padding: "14px 10px",
    borderRadius: "10px",
    background: "#121212",
    border: `1px solid ${cadetBlue}60`,
    boxShadow: `0 0 12px ${cadetBlue}33`,
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

  const goalSection = {
    marginTop: "28px",
    padding: "16px",
    background: "#0f0f0f",
    borderRadius: "12px",
    boxShadow: `0 0 12px ${cadetBlue}22`,
  };

  const goalHeader = {
    fontSize: "17px",
    marginBottom: "12px",
    color: cadetBlue,
    fontWeight: "600",
  };

  const goalInput = {
    width: "80%",
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${cadetBlue}`,
    background: "#111",
    color: "#fff",
    textAlign: "center",
    outline: "none",
    marginBottom: "12px",
  };

  const goalBtn = {
    padding: "8px 18px",
    borderRadius: "8px",
    border: "none",
    background: cadetBlue,
    color: "#000",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: `0 0 12px ${cadetBlue}55`,
  };

  const logoutBtn = {
    marginTop: "28px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    borderRadius: "12px",
    background: `linear-gradient(90deg, ${cadetBlue}, #6fb4b6)`,
    border: "none",
    color: "#000",
    cursor: "pointer",
    boxShadow: `0 0 18px ${cadetBlue}88`,
    transition: "0.22s",
  };

  const logoutHover = {
    transform: "scale(1.07)",
    boxShadow: `0 0 28px ${cadetBlue}dd`,
  };

  const [hover, setHover] = useState(false);

  const handleSubmit = () => {
    setIsDisabled(true);
    dispatch(SetMonthlyGoal(token, monthlyGoal, () => setIsDisabled(false)));
    setMonthlyGoal("");
  };

  return (
    <div style={wrapper}>
      <div style={card}>

        {/* Avatar */}
        <img
          style={avatar}
          src={`https://ui-avatars.com/api/?name=${user?.username}&background=111111&color=5F9EA0`}
          alt="profile avatar"
        />

        {/* Username */}
        <h2 style={nameStyle}>{(user?.username || "User").toUpperCase()}</h2>

        {/* email */}
        <p style={emailStyle}>{user?.email || "Email unavailable"}</p>

        <div style={divider}></div>

        {/* Stats */}
        <div style={statRow}>
          <div style={statCard}>
            <div style={statNumber}>₹52K</div>
            <div style={statLabel}>Total Income</div>
          </div>
          <div style={statCard}>
            <div style={statNumber}>₹34K</div>
            <div style={statLabel}>Total Expense</div>
          </div>
          <div style={statCard}>
            <div style={statNumber}>128</div>
            <div style={statLabel}>Transactions</div>
          </div>
        </div>

        {/* Goal area */}
        <div style={goalSection}>
          <h3 style={goalHeader}>Set Monthly Spending Limit</h3>

          <input
            type="number"
            style={goalInput}
            placeholder="Enter amount"
            value={monthlyGoal}
            onChange={(e) => setMonthlyGoal(e.target.value)}
          />

          <button
            style={goalBtn}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Set Goal
          </button>
        </div>

        {/* Logout */}
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
  );
};

export default Profiles;