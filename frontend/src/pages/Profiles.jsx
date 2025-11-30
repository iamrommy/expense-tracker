import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.css";
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

  return (
    <div className="profile-wrapper">
      <h2>Welcome {user?.username}</h2>

      <button onClick={handleLogout}>Logout</button>

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
    </div>
  );
};

export default Profile;
