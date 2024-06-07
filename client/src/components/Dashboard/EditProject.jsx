import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProject = (props) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    category: '',
    images: []
  });

  useEffect(() => {
    // Fetch the project details when the component mounts
    axios.get(`http://localhost:3000/userprojects/${props.match.params.id}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.log('Error in fetching project', error);
      });
  }, []);

  const handleChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make an API call to update the project
    axios.put(`http://localhost:3000/userprojects/${props.match.params.id}`, project)
      .then(response => {
        // Navigate back to the projects page
        props.history.push('/projects');
      })
      .catch(error => {
        console.log('Error in updating project', error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={project.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={project.description} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={project.category} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default EditProject;