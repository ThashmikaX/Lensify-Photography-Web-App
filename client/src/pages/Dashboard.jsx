import React from 'react'
import './Dashboard.css'
import { useState } from 'react'
import { Overview, Analytics, Setting, YourGigs, ImageAnimation } from '../components'


function Dashboard() {

  const [activeLink, setActiveLink] = useState('Overview') // [1
  const handleLinkClick = (linkName) => {
    console.log(`${linkName} was clicked`);
    setActiveLink(linkName);
  }

  return (
    <>
      <div className='side-navbar' >
          <ul className='side-nav-links'>
            <li className='link' onClick={() => handleLinkClick('Overview')}>Overview</li>
            <li className='link' onClick={() => handleLinkClick('Your Gigs')}>Your Gigs</li>
            <li className='link' onClick={() => handleLinkClick('Analytics')}>Analytics</li>
            <li className='link ' onClick={() => handleLinkClick('Setting')}>Setting</li>
            <li className='link divider-li' >Logout</li>
          </ul>
      </div>
      <div className='component-main'><div className='components'>
        {activeLink === 'Overview' && <Overview/>}
        {activeLink === 'Your Gigs' && <YourGigs />}
        {activeLink === 'Analytics' && <Analytics />}
        {activeLink === 'Setting' && <Setting />}
      </div></div>
      <div className='bg-black'></div>
      <div className='bg-image'><ImageAnimation/></div>
    </>
  )
}

export default Dashboard
