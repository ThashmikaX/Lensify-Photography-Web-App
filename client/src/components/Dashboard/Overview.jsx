import React from 'react'
import { ProfileComponent, Card, Button, ImageAnimation, ProjectOverview } from '../../components'

import './Overview.css'

const Overview = () => {
  return (
    <div className='overview'>
      <div className='overview-header'>
        <h1 className='headline'>Projects</h1>
        <ProfileComponent></ProfileComponent>
      </div>
      <div className='overview-content'>
        <div className='overview-column-one'>
          <Card style={{ padding: '2rem' }}>
            <h1>Followers</h1>
            <p>80</p>
          </Card>
          <Card style={{ padding: '2rem' }}>
            <h1>Likes</h1>
            <p>150</p>
          </Card>
          <Card style={{ padding: '2rem' }}>
            <h1>Profile Views</h1>
            <p>236</p>
          </Card>
        </div>
        <div className='overview-column-two'>
          <ProjectOverview button='false'></ProjectOverview>
        </div>
      </div>
    </div>
  )
}

export default Overview
