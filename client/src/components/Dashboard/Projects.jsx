import React, { useEffect, useState } from 'react'
import { ProfileComponent, Card, ProjectOverview } from '../../components'
import { useAuth } from '../../auth/Auth';
import axios from 'axios';
import './Projects.css'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:3000/userprojects', {
      params: {
        id: auth.userId
      }
    })
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log('Error in fetching projects', error);
      });
  }, []);

  return (
    <div className='overview'>
      <div className='overview-header'>
        <h1 className='headline'>Projects</h1>
        <ProfileComponent></ProfileComponent>
      </div>
      <div className='overview-content'>
        <div className='overview-column-one'>
          <Card className='user-project-list' style={{ padding: '2rem' }}>
            {projects.map(project => (
              <Card className='user-project' key={project._id}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <p>Category: {project.category}</p>
                {project.images.map((image, index) => (
                  <img src={image} alt={`Project ${project.title} image ${index + 1}`} key={index} />
                ))}
              </Card>
            ))}
          </Card>
        </div>
        <div className='overview-column-two'>
            <ProjectOverview button='true'></ProjectOverview>
        </div>
      </div>
      </div>
  )
}

export default Projects
