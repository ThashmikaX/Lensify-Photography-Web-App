import React, { useEffect, useState } from 'react'
import { ProfileComponent, Card, ProjectOverview } from '../../components'
import { useAuth } from '../../auth/Auth';
import axios from 'axios';
import './Projects.css'
import { useHistory } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { auth } = useAuth();
  const history = useHistory();

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

  const handleEdit = (id) => {
    // Navigate to the edit page with the project id
    // This assumes you have a route set up for editing projects
    // Replace '/edit-project' with your actual edit project route
    history.push(`/edit-project/${id}`);
  }

  const handleDelete = (id) => {
    // Make an API call to delete the project
    axios.delete(`/api/projects/${id}`)
      .then(response => {
        // Remove the deleted project from the state
        setProjects(projects.filter(project => project._id !== id));
      })
      .catch(error => {
        console.log('Error in deleting project', error);
      });
  }

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
                <button onClick={() => handleEdit(project._id)}>Edit</button>
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
  )
}

export default withRouter(Projects);
