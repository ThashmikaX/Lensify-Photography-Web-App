import React from 'react'
import LoginBackground from '../../assets/images/login-bg.jpg'
import { Button } from '../../components'
import { useState } from 'react'
import './CreateProjectForm.css'

const CreateProjectForm = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [role, setRole] = useState("photographer")

  return (
    <div className='form-container '>
        <div className='form '>
            <form className='field' onSubmit={(event) => {console.log("Button Clicked");}}>
                <label>Project Name</label>
                <input type='text' placeholder='Enter your first name' value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                <label>Project Description</label>
                <input type='text' placeholder='Enter your last name' value={lastName} onChange={(e) => setlastName(e.target.value)} />
                <label>Catagory</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value='photographer'>Wedding</option>
                    <option value='client'>Birthday</option>
                    <option value='admin'>Wildlife</option>
                </select>
                <Button type='submit' className='glass-dark-ash button'>Upload Project</Button>
            </form>
        </div>
    </div>
  )
}

export default CreateProjectForm
