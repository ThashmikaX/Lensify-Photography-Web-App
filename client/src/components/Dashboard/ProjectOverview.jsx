import React, { useState } from 'react'
import { Card, Button, PopupForm } from '../../components'
import Image from '../../assets/landscapes/2.jpg'


const ProjectOverview = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <>
            <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}/>
            <Card className='project-card-on-overview'>
                <div className='project-count-and-button'>
                    <div className='project-count'>
                        <h1>Projects</h1>
                        <p>05</p>
                    </div>
                    <Card className='create-project-button'>
                        <Button className='yellow-gradient' onClick={() => setIsPopupOpen(true)}>Create Project</Button>
                    </Card>
                </div>
                <Card className='project-image'>
                    <img src={Image}></img>
                    {/* <ImageAnimation></ImageAnimation> */}
                </Card>
            </Card>
        </>
)    
}

export default ProjectOverview
