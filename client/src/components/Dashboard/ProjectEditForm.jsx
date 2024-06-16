import React, { useRef, useState, useEffect } from "react";
import "./PopupForm.css";
import axios from 'axios';
import Button from "../Button";

function ProjectEditForm({ isOpen, onClose, project_Id }) {
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

    // Make an API call to update the project
    axios.put(`http://localhost:3000/userprojects/${props.match.params.id}`, project)
      .then(response => {
        console.log("Project edit done");
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
  } else if (dialogRef.current && dialogRef.current.open) {
    dialogRef.current.close();
      }

      console.log("ëdit pop up form", project_Id);
    axios.get('http://localhost:3000/getprojectbyid', {
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
            <option value='photographer'>Wedding</option>
            <option value='client'>Birthday</option>
            <option value='admin'>Wildlife</option>
        </select>
        {/* <label>Profile Image
            <input name='images'  value={project.images} multiple accept="image/*,video/*" type='file' className='file-upload' onChange={handleChange} />
        </label> */}
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
