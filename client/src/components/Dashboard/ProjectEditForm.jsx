import React, { useRef, useState, useEffect } from "react";
import "./PopupForm.css";
import axios from 'axios';
import Button from "../Button";

function ProjectEditForm({ isOpen, onClose, project_Id }) {
  const rooturl = import.meta.env.VITE_BACKEND_API;
  const dialogRef = useRef();
  const [project, setProject] = useState({
    _id: '',
    userId: '',
    title: '',
    description: '',
    category: ''
});

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append the form fields to the FormData object
    formData.append('userId', project.userId);
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('category', project.category);

    // Make an API call to update the project
    axios.put(`${rooturl}/project`, formData, {
      params: {
        id: project._id
      }
    })
      .then(response => {
        console.log("Project updated successfully");
        if (onClose) onClose();
      })
      .catch(error => {
        console.log('Error in updating project', error);
      });
  }

  useEffect(() => {
    // console.log("ëdit pop up form", project_Id);
    // axios.get('http://localhost:3000/getprojectbyid', {
    //   params: {
    //     id: project_Id
    //   }
    // })
    //   .then(response => {
    //     setProject(response.data);
    //   })
    //   .catch(error => {
    //     console.log('Error in fetching project', error);
    //   });
  }, []);
  

  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log(name);
  if (type === 'file') {
    // Assuming `project.images` is meant to store FileList
    setProject({ ...project, images: files });
  } else {
    setProject({ ...project, [name]: value });
  }
};

    useEffect(() => {
  if (isOpen) {
    if (dialogRef.current) dialogRef.current.showModal();
    
    // Only fetch if we have a valid project_Id
    if (project_Id) {
      axios.get(`${rooturl}/getprojectbyid`, {
        params: {
          id: project_Id
        }
      })
        .then(response => {
          setProject(response.data);
        })
        .catch(error => {
          console.log('Error in fetching project', error);
        });
    }
  } else if (dialogRef.current && dialogRef.current.open) {
    dialogRef.current.close();
    // Reset form when closing
    setProject({
      _id: '',
      userId: '',
      title: '',
      description: '',
      category: ''
    });
  }
}, [isOpen, project_Id]);

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
  
  // if (!project) {
  //   return <div>Loading...</div>
  // }

  return (
    <dialog ref={dialogRef} data-modal className="dialog-form">
      <form className='field' onSubmit={handleEditFormSubmit}>
        <label>Project Name</label>
        <input type='text' name='title' placeholder='Ex: Yala Safari' value={project.title} onChange={handleChange}  />
        <label>Project Description</label>
        <input type='text' name='description' placeholder='' value={project.description} onChange={handleChange} />
        <label>Catagory</label>
        <select name='category' value={project.category} onChange={handleChange}>
            <option value='Wedding'>Wedding</option>
            <option value='Birthday'>Birthday</option>
            <option value='Wildlife'>Wildlife</option>
        </select>
        {/* <label>Profile Image
            <input name='images'  value={project.images} multiple accept="image/*,video/*" type='file' className='file-upload' onChange={handleChange} />
        </label> */}
        <div className="buttons">
          <Button type="button" onClick={closeDialog} className="white button">
            Cancel
          </Button>
          <Button type="submit" className="white button">
            Save Changes
        </Button>
        </div>
      </form>
    </dialog>
  );
}

export default ProjectEditForm;
