import React, { useRef, useState, useEffect } from "react";
import "./PopupForm.css";
import { useAuth } from '../../auth/Auth';
import axios from 'axios';
import Button from "../Button";

function PopupForm({ onSubmit, isOpen, onClose }) {
  const dialogRef = useRef();
  const rooturl = import.meta.env.VITE_BACKEND_API;
  const { auth } = useAuth();

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDes, setProjectDes] = useState("");
    const [category, setCategory] = useState("Wedding");
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
        formData.append('category', category);

        for (let i = 0; i < projectImages.length; i++) {
            formData.append('image', projectImages[i]);
        }

        // Send the request
        axios.post(`${rooturl}/portfolio`, formData, {
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
      <form className='field' onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input type='text' placeholder='Ex: Yala Safari' value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
        <label>Project Description</label>
        <input type='text' placeholder='' value={projectDes} onChange={(e) => setProjectDes(e.target.value)} />
        <label>Catagory</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value='Wedding'>Wedding</option>
            <option value='Birthday'>Birthday</option>
            <option value='Wildlife'>Wildlife</option>
        </select>
        <label>Profile Image
            <input multiple accept="image/*,video/*" type='file' className='file-upload' onChange={(e) => setProjectImages(e.target.files)} />
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

export default PopupForm;
