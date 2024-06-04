import React from 'react'
import LoginBackground from '../../assets/images/login-bg.jpg'
import { Button } from '../../components'
import { useState } from 'react'
import './CreateProjectForm.css'
import Axios from 'axios';
import { useAuth } from '../../auth/Auth'

const CreateProjectForm = () => {
    const { auth } = useAuth();

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDes, setProjectDes] = useState("");
    const [role, setRole] = useState("photographer");
    const [projectImages, setProjectImages] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Register Clicked");

        // Create a FormData object
        const formData = new FormData();

        // Append the form fields to the FormData object
        formData.append('userId', auth.userId);
        formData.append('title', projectTitle);
        formData.append('description', projectDes);
        formData.append('category', role);

        for (let i = 0; i < projectImages.length; i++) {
            formData.append('image', projectImages[i]);
        }

        // Send the request
        Axios.post('http://localhost:3000/portfolio', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }

  return (
    <div className='form-container '>
        <div className='form '>
              <form className='field' onSubmit={handleSubmit}>
                <label>Project Name</label>
                <input type='text' placeholder='Enter your first name' value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                <label>Project Description</label>
                <input type='text' placeholder='Enter your last name' value={projectDes} onChange={(e) => setProjectDes(e.target.value)} />
                <label>Catagory</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value='photographer'>Wedding</option>
                    <option value='client'>Birthday</option>
                    <option value='admin'>Wildlife</option>
                </select>
                <label>Profile Image
                    <input multiple accept="image/*,video/*" type='file' className='file-upload' onChange={(e) => setProjectImages(e.target.files)} />
                </label>
                <Button type='submit' className='glass-dark-ash button'>Upload Project</Button>
            </form>
        </div>
    </div>
  )
}

export default CreateProjectForm
