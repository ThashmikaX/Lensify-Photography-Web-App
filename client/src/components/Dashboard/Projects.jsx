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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  console.log(auth.userId);

  const fetchProjects = () => {
    axios.get(`${rooturl}/userprojects`, {
      params: {
        id: auth.userId
      }
    })
      .then(response => {
        const projectsData = Array.isArray(response.data) ? response.data : [response.data];
        setProjects(projectsData);
      })
      .catch(error => {
        console.log('Error in fetching projects', error);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  const handleEdit = (id) => {
    setProjectId(id);
    setIsEditProjectOpen(true);
  };

  const handleEditClose = () => {
    setIsEditProjectOpen(false);
    setProjectId(null);
    // Refresh projects after edit
    setRefreshTrigger(prev => prev + 1);
  };

  const openDeleteDialog = (project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleDelete = () => {
    if (!projectToDelete) return;
    
    axios.delete(`${rooturl}/project`, {
      params: {
        id: projectToDelete._id
      }
    })
      .then(response => {
        setProjects(userprojects.filter(project => project._id !== projectToDelete._id));
        closeDeleteDialog();
      })
      .catch(error => {
        console.log('Error in deleting project', error);
        closeDeleteDialog();
      });
  };

  return (
    <>
    <ProjectEditForm isOpen={isEditProjectOpen} onClose={handleEditClose} project_Id={projectId}/>
    
    {/* Delete Confirmation Dialog */}
    {isDeleteDialogOpen && (
      <div className="delete-dialog-overlay">
        <div className="delete-dialog">
          <div className="delete-dialog-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Delete Project</h3>
          <p>Are you sure you want to delete <strong>"{projectToDelete?.title}"</strong>? This action cannot be undone.</p>
          <div className="delete-dialog-buttons">
            <button className="cancel-btn" onClick={closeDeleteDialog}>Cancel</button>
            <button className="confirm-delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )}
    
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
      <button className='edit-button' onClick={() => handleEdit(project._id)}>
        <i className='fas fa-edit'></i>
      </button>
      <button className='delete-button' onClick={() => openDeleteDialog(project)}>
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
