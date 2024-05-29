import React from 'react'
import './Landing.css'
import { Button } from '../components'
import { useAuth } from '../auth/Auth';


const Landing = () => {
  const { auth } = useAuth();

  return (
      <div className='title'>
      <h1 className='sub-head head'>Perfect Lens for Your</h1>
      <h1 className='main-head head'>Perfect Moment</h1>
      {auth && <Button className='white' url='/dashboard'>Dashboard</Button>}
      
      
    </div>
  )
}

export default Landing
