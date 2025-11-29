import React from 'react'
import { useSelector } from 'react-redux';
import "./Profile.css";

const Profile = () => {

    const {user} = useSelector((state)=>state.user);

  return (
    <div>
      Welcome {user?.username}
    </div>
  )
}

export default Profile
