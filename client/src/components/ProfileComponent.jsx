import React from 'react'
import dp from '../assets/sudesh.png'

const ProfileComponent = () => {
  return (
    <div className='profile'>
        <img src={dp} alt='profile' className='profile-image' />
        <h3>Sudesh Thashmika</h3>
    </div>
  )
}

export default ProfileComponent
