import React from 'react'
import dp from '../assets/sudesh.png'
import './ProfileComponent.css'

const ProfileComponent = () => {
  return (
      <div className='profile'>
        <img src={dp} alt='profile' className='profile-image' />
          <div>
              <h3>Sudesh Thashmika</h3>
          <p>Wildlife Photographer</p>
          </div>
    </div>
  )
}

export default ProfileComponent
