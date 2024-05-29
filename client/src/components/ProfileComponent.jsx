import React, { useEffect, useState } from 'react'
import dp from '../assets/sudesh.png'
import './ProfileComponent.css'
import Axios from 'axios'
import { useAuth } from '../auth/Auth';
import noUserIcon from '../assets/user.png'

const ProfileComponent = () => {

  const { auth } = useAuth();

  const[userImage, setUserImage] = useState(noUserIcon);
  const [userName, setUserName] = useState('No User')
  
  getUserProfile();

  console.log('auth id', auth.userId);
  console.log(userName);

  async function getUserProfile() {
    console.log("function called");
    try {
      const response = await Axios.get('http://localhost:3000/userprofile', {
        params: {
          id : auth.userId
        }
      })
      setUserImage(response.data.respond.profilePicture);
      setUserName(`${response.data.respond.firstName} ${response.data.respond.lastName}`);
      console.log('profile set success');
    }
    catch (error) {
      console.log(error);
    }
  } 

  return (
      <div className='profile'>
        <img src={userImage} alt='profile' className='profile-image' />
        <div>
        <h3 className='user-name'>{ userName }</h3>
          <p className='user-location'>Matara, Sri Lanka</p>
        </div>
    </div>
  )
}

export default ProfileComponent
