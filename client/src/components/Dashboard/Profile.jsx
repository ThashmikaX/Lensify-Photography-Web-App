import React, { useEffect, useState } from 'react'
import { ProfileComponent, Card, Button } from '../../components'
import { useAuth } from '../../auth/Auth';
import axios from 'axios';
import './Profile.css'

const Profile = () => {
  const rooturl = import.meta.env.VITE_BACKEND_API;
  const { auth } = useAuth();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    location: '',
    specialty: '',
    profilePicture: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${rooturl}/userprofile`, {
      params: { id: auth.userId }
    })
    .then(response => {
      setUserData(response.data.respond);
    })
    .catch(error => {
      console.log('Error fetching profile:', error);
    });
  }, []);

  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <h1 className='headline'>Profile</h1>
        <ProfileComponent />
      </div>

      <div className='profile-content'>
        <Card className='profile-main-card'>
          <div className='profile-cover'>
            <div className='profile-avatar'>
              <img src={userData.profilePicture || '/default-avatar.png'} alt='Profile' />
              <button className='edit-avatar-btn'>📷</button>
            </div>
          </div>
          
          <div className='profile-info'>
            <h2>{userData.firstName} {userData.lastName}</h2>
            <p className='specialty'>{userData.specialty || 'Photographer'}</p>
            <p className='location'>📍 {userData.location || 'Location not set'}</p>
            
            <div className='profile-stats'>
              <div className='profile-stat'>
                <span className='stat-number'>156</span>
                <span className='stat-label'>Projects</span>
              </div>
              <div className='profile-stat'>
                <span className='stat-number'>2.4k</span>
                <span className='stat-label'>Followers</span>
              </div>
              <div className='profile-stat'>
                <span className='stat-number'>4.9</span>
                <span className='stat-label'>Rating</span>
              </div>
            </div>
          </div>
        </Card>

        <div className='profile-details'>
          <Card className='detail-card'>
            <h3>About</h3>
            <p>{userData.bio || 'No bio added yet. Tell clients about yourself and your photography style.'}</p>
          </Card>

          <Card className='detail-card'>
            <h3>Contact Information</h3>
            <div className='contact-info'>
              <div className='contact-item'>
                <span className='contact-icon'>📧</span>
                <span>{userData.email}</span>
              </div>
              <div className='contact-item'>
                <span className='contact-icon'>📍</span>
                <span>{userData.location || 'Not specified'}</span>
              </div>
            </div>
          </Card>

          <Card className='detail-card'>
            <h3>Services</h3>
            <div className='services-tags'>
              <span className='service-tag'>Wedding</span>
              <span className='service-tag'>Portrait</span>
              <span className='service-tag'>Events</span>
              <span className='service-tag'>Commercial</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
