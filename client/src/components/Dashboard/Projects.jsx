import React, { useState } from 'react'
import {ProfileComponent, Card, ProjectOverview, CreateProjectForm} from '../../components'

const YourGigs = (props) => {
  const [state, setState] = useState(false);

  if (!state) {
    return (
      <div className='overview'>
      <div className='overview-header'>
        <h1 className='headline'>Overview</h1>
        <ProfileComponent></ProfileComponent>
      </div>
      <div className='overview-content'>
        <div className='overview-column-one'>
          <Card style={{ padding: '2rem' }}>
            <h1>Followers</h1>
            <p>80</p>
          </Card>
        </div>
        <div className='overview-column-two'>
          <ProjectOverview button='true'></ProjectOverview>
        </div>
      </div>
    </div>
  )
  } else {
    return (
      <div className='overview'>
      <div className='overview-header'>
        <h1 className='headline'>Create Project</h1>
        <ProfileComponent></ProfileComponent>
      </div>
      <div className='overview-content'>
        <div className='overview-column-one'>
          <Card style={{ padding: '2rem' }}>
            <CreateProjectForm/>
          </Card>
        </div>
        <div className='overview-column-two'>
          <ProjectOverview button='true'></ProjectOverview>
        </div>
      </div>
    </div>
  )
  }
  
}

export default YourGigs
