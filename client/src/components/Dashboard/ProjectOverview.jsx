import React from 'react'
import { Card, Button } from '../../components'
import Image from '../../assets/landscapes/2.jpg'

const ProjectOverview = (props) => {
    if (props.button == 'true') {
        return (
    <Card className='project-card-on-overview'>
        <div className='project-count-and-button'>
            <div className='project-count'>
            <h1>Projects</h1>
            <p>05</p>
            </div>
            <Card className='create-project-button'>
            <Button className='yellow-gradient'>Create Project</Button>
            </Card>
        </div>
        <Card className='project-image'>
            <img src={Image}></img>
            {/* <ImageAnimation></ImageAnimation> */}
        </Card>
    </Card>
  )    
    } else {
        return (
    <Card className='project-card-on-overview'>
        <div className='project-count-and-button'>
            <div className='project-count'>
            <h1>Projects</h1>
            <p>05</p>
            </div>
            <Card className='create-project-button'>
            </Card>
        </div>
        <Card className='project-image'>
            <img src={Image}></img>
            {/* <ImageAnimation></ImageAnimation> */}
        </Card>
    </Card>
  )  
        
    }
  
}

export default ProjectOverview
