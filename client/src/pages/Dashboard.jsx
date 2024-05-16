import React from 'react'
import './Dashboard.css'
import dp from '../assets/sudesh.png'
import { useState } from 'react'
import { Overview, Analytics, Setting, YourGigs  } from '../components'


function Dashboard() {

  const [activeLink, setActiveLink] = useState('Overview') // [1
  const handleLinkClick = (linkName) => {
    console.log(`${linkName} was clicked`);
    setActiveLink(linkName);
  }

  return (
    <>
      <div className='side-navbar'>
        <div className='profile'>
          <img src={dp} alt='profile' className='profile-image' />
          <h3>Sudesh Thashmika</h3>
        </div>
        <div className='side-nav-links'>
          <ul>
            <li className='link' onClick={() => handleLinkClick('Overview')}>Overview</li>
            <li className='link' onClick={() => handleLinkClick('Your Gigs')}>Your Gigs</li>
            <li className='link' onClick={() => handleLinkClick('Analytics')}>Analytics</li>
            <li className='link divider-li' onClick={() => handleLinkClick('Setting')}>Setting</li>
            <li className='link' >Logout</li>
          </ul>
        </div>
      </div>
      <div className='components'>
        {activeLink === 'Overview' && <Overview/>}
        {activeLink === 'Your Gigs' && <YourGigs />}
        {activeLink === 'Analytics' && <Analytics />}
        {activeLink === 'Setting' && <Setting />}
      </div>
    </>
  )
}

export default Dashboard
