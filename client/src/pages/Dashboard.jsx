import React from 'react'
import './Dashboard.css'
import { useState } from 'react'
import { Overview, Analytics, Setting, Projects, ImageAnimation, Profile, Button } from '../components'


function Dashboard() {

  const [activeLink, setActiveLink] = useState('Overview') // [1
  const handleLinkClick = (linkName) => {
    console.log(`${linkName} was clicked`);
    setActiveLink(linkName);
  }

  return (
    <>
      <div className='side-navbar' >
        <div className='side-nav-links'>
          <ul >
            <Button className='dash btn-dashboard' onClick={() => handleLinkClick('Overview')}>Overview</Button>
            <Button className='dash btn-dashboard' onClick={() => handleLinkClick('Projects')}>Projects</Button>
            <Button className='dash btn-dashboard' onClick={() => handleLinkClick('Analytics')}>Analytics</Button>
            <Button className='dash btn-dashboard' onClick={() => handleLinkClick('Profile')}>Profile</Button>
            <Button className='dash btn-dashboard ' onClick={() => handleLinkClick('Setting')}>Setting</Button>
            <Button className='dash divider-li btn-dashboard' >Logout</Button>
          </ul>
        </div>
      </div>
      <div className='component-main'><div className='components'>
        {activeLink === 'Overview' && <Overview/>}
        {activeLink === 'Projects' && <Projects />}
        {activeLink === 'Analytics' && <Analytics />}
        {activeLink === 'Profile' && <Profile />}
        {activeLink === 'Setting' && <Setting />}
      </div></div>
      <div className='bg-black'></div>
      <div className='bg-image'><ImageAnimation/></div>
    </>
  )
}

export default Dashboard
