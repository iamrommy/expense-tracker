import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.css";
import { logout } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const {user} = useSelector((state)=>state.user);

    const handleLogout = () =>{
     dispatch(logout(navigate));
     
    }
  return (
    <div>
      Welcome {user?.username}

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
