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
    <Card className='user-project' key={project._id}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Category: {project.category}</p>
      {project.images.map((image, index) => (
        <img src={image} alt={`Project ${project.title} image ${index + 1}`} key={index} />
      ))}
      <button onClick={() => {
        setProjectId(project._id);
        handleEdit();
      }}>Edit</button>
      <button onClick={() => handleDelete(project._id)}>Delete</button>
    </Card>
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
