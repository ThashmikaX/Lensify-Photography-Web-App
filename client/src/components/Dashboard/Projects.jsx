import React, { useEffect, useState } from 'react'
import { ProfileComponent, Card, ProjectOverview, ProjectEditForm } from '../../components'
import { useAuth } from '../../auth/Auth';
import axios from 'axios';
import './Projects.css'

const Projects = () => {
  const rooturl = import.meta.env.VITE_BACKEND_API;
  const [userprojects, setProjects] = useState([]);
  const { auth } = useAuth();
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);

  console.log(auth.userId);

  useEffect(() => {
    axios.get(`${rooturl}/userprojects`, {
      params: {
        id: auth.userId
      }
    })
      .then(response => {
      // Check if response.data is an array, if not, make it an array
      const projectsData = Array.isArray(response.data) ? response.data : [response.data];
      setProjects(projectsData);
    })
      .catch(error => {
        console.log('Error in fetching projects', error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditProjectOpen(true);
    console.log('project id ', projectId);
    console.log("handle edit called", projectId);

  }

  const handleDelete = (id) => {
    // Make an API call to delete the project
    axios.delete(`${rooturl}/project`, {
      params: {
        id:id
      }
    })
      .then(response => {
        // Remove the deleted project from the state
        setProjects(userprojects.filter(project => project._id !== id));
      })
      .catch(error => {
        console.log('Error in deleting project', error);
      });
  }

  return (
    <>
    <ProjectEditForm isOpen={isEditProjectOpen} onClose={() => setIsEditProjectOpen(false)} project_Id={projectId}/>
    <div className='overview'>
      <div className='overview-header'>
        <h1 className='headline'>Projects</h1>
        <ProfileComponent></ProfileComponent>
      </div>
      <div className='overview-content'>
        <div className='overview-column-one'>
          <Card className='user-project-list' style={{ padding: '2rem' }}>
  {userprojects.map(project => (
    <div className='project-card' style={{ backgroundImage: `url(${project.images[0]})` }}>
    <div className='project-card-first-c'>
    <h2 className='project-title'>{project.title}</h2>
    <p className='project-description'>{project.description}</p>
      </div>
      <div className='project-card-second-c'>
        <p className='project-category'>{project.category}</p>
        <div className='project-buttons'>
      <button className='edit-button'>
        <i className='fas fa-edit'></i>
      </button>
      <button className='delete-button'>
        <i className='fas fa-trash-alt'></i>
      </button>
    </div>
      </div>
    
</div>
  ))}
</Card>
        </div>
        <div className='overview-column-two'>
            <ProjectOverview button='true'></ProjectOverview>
        </div>
      </div>
      </div>
      </>
  )
}

export default Projects;
