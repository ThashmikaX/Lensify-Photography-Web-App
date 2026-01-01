import React, { useEffect, useState, useRef } from 'react'
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
  const [editData, setEditData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    axios.get(`${rooturl}/userprofile`, {
      params: { id: auth.userId }
    })
    .then(response => {
      setUserData(response.data.respond);
    })
    .catch(error => {
      console.log('Error fetching profile:', error);
    });
  };

  const handleEditClick = () => {
    setEditData({ ...userData });
    setPreviewImage(null);
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('firstName', editData.firstName);
    formData.append('lastName', editData.lastName);
    formData.append('bio', editData.bio || '');
    formData.append('location', editData.location || '');
    formData.append('specialty', editData.specialty || '');
    
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    try {
      const response = await axios.put(`${rooturl}/userprofile`, formData, {
        params: { id: auth.userId },
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setUserData(response.data.respond);
      setIsEditing(false);
      setPreviewImage(null);
      setSelectedFile(null);
    } catch (error) {
      console.log('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <h1 className='headline'>Profile</h1>
        <div className='profile-header-actions'>
          {!isEditing ? (
            <button className='edit-profile-btn' onClick={handleEditClick}>
              <i className='fas fa-edit'></i> Edit Profile
            </button>
          ) : (
            <div className='edit-actions'>
              <button className='cancel-btn' onClick={handleCancelEdit}>Cancel</button>
              <button className='save-btn' onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
          <ProfileComponent />
        </div>
      </div>

      <div className='profile-content'>
        <Card className='profile-main-card'>
          <div className='profile-cover'>
            <div className='profile-avatar' onClick={handleImageClick}>
              <img src={previewImage || userData.profilePicture || '/default-avatar.png'} alt='Profile' />
              {isEditing && (
                <>
                  <div className='avatar-overlay'>
                    <i className='fas fa-camera'></i>
                  </div>
                  <input 
                    type='file' 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept='image/*'
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </div>
          </div>
          
          <div className='profile-info'>
            {isEditing ? (
              <div className='edit-name-fields'>
                <input 
                  type='text' 
                  name='firstName'
                  value={editData.firstName || ''}
                  onChange={handleInputChange}
                  placeholder='First Name'
                  className='edit-input'
                />
                <input 
                  type='text' 
                  name='lastName'
                  value={editData.lastName || ''}
                  onChange={handleInputChange}
                  placeholder='Last Name'
                  className='edit-input'
                />
              </div>
            ) : (
              <h2>{userData.firstName} {userData.lastName}</h2>
            )}
            
            {isEditing ? (
              <input 
                type='text' 
                name='specialty'
                value={editData.specialty || ''}
                onChange={handleInputChange}
                placeholder='Your specialty (e.g., Wedding Photographer)'
                className='edit-input specialty-input'
              />
            ) : (
              <p className='specialty'>{userData.specialty || 'Photographer'}</p>
            )}
            
            {isEditing ? (
              <div className='edit-location'>
                <span>📍</span>
                <input 
                  type='text' 
                  name='location'
                  value={editData.location || ''}
                  onChange={handleInputChange}
                  placeholder='Your location'
                  className='edit-input location-input'
                />
              </div>
            ) : (
              <p className='location'>📍 {userData.location || 'Location not set'}</p>
            )}
            
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
            {isEditing ? (
              <textarea 
                name='bio'
                value={editData.bio || ''}
                onChange={handleInputChange}
                placeholder='Tell clients about yourself and your photography style...'
                className='edit-textarea'
                rows={4}
              />
            ) : (
              <p>{userData.bio || 'No bio added yet. Tell clients about yourself and your photography style.'}</p>
            )}
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
