import React, { useRef, useState, useEffect } from "react";
import "./PopupForm.css";
import { useAuth } from '../../auth/Auth';
import Axios from 'axios';
import Button from "../Button";

function ProjectEditForm({ onSubmit, isOpen, onClose, id }) {
    const dialogRef = useRef();
    const { auth } = useAuth();

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDes, setProjectDes] = useState("");
    const [role, setRole] = useState("photographer");
    const [projectImages, setProjectImages] = useState(null);
    const [project, setProject] = useState(null);

    const handleEditFormSubmit = (event) => {
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

    useEffect(() => {
    axios.get('http://localhost:3000/getprojectbyid', {
      params: {
        id: id
      }
    })
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.log('Error in fetching project', error);
      });
  }, []);

    useEffect(() => {
        if (isOpen) {
        dialogRef.current.showModal();
        } else if (dialogRef.current.open) {
        dialogRef.current.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const dialogElement = dialogRef.current;
        const handleCancel = () => {
        if (onClose) {
            onClose();
        }
        };

        if (dialogElement) {
        dialogElement.addEventListener("cancel", handleCancel);
        }

        return () => {
        if (dialogElement) {
            dialogElement.removeEventListener("cancel", handleCancel);
        }
        };
    }, [onClose]);

    const closeDialog = () => {
        if (onClose) {
        onClose();
        }
    };

  return (
    <dialog ref={dialogRef} data-modal className="dialog-form">
      <form className='field' onSubmit={handleEditFormSubmit}>
        <label>Project Name</label>
        <input type='text' placeholder='Ex: Yala Safari' value={project.title} onChange={(e) => setProjectTitle(e.target.value)} />
        <label>Project Description</label>
        <input type='text' placeholder='' value={project.description} onChange={(e) => setProjectDes(e.target.value)} />
        <label>Catagory</label>
        <select value={project.category} onChange={(e) => setRole(e.target.value)}>
            <option value='photographer'>Wedding</option>
            <option value='client'>Birthday</option>
            <option value='admin'>Wildlife</option>
        </select>
        <label>Profile Image
            <input value={project.images} multiple accept="image/*,video/*" type='file' className='file-upload' onChange={(e) => setProjectImages(e.target.files)} />
        </label>
        <div className="buttons">
          <Button type="button" onClick={closeDialog} className="white button">
            Cancel
          </Button>
          <Button type="submit" onClick={closeDialog} className="white button">
            Submit
        </Button>
        </div>
      </form>
    </dialog>
  );
}

export default ProjectEditForm;
