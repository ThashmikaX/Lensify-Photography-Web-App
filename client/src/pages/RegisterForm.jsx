import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterForm.css'
import LoginBackground from '../assets/images/login-bg.jpg'
import { Button } from '../components';
import { useState } from "react";
import Axios from "axios";

const RegisterForm = (props) => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [role, setRole] = useState("photographer")

    const [step, setStep] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Register Clicked");

        // Create a FormData object
        const formData = new FormData();

        // Append the form fields to the FormData object
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', confirmPassword);
        formData.append('username', username);
        formData.append('role', role);
        formData.append('profileImage', profileImage); // This should be a File object

        // Send the request
        Axios.post('http://localhost:3000/users', formData, {
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

    if (step === 1) {
        return (
            <div className='login-form'>
                <div className='feature-image'></div>
                <div className='form-container ' style={{ backgroundImage: `url(${LoginBackground})` }}>
                    <div className='form '>
                        <h1>Register</h1>
                        <form className='field' onSubmit={(event) => {
                            event.preventDefault();
                            setStep(2);
                            console.log("Button Clicked");
                        }}>
                            <label>First Name</label>
                            <input type='text' placeholder='Enter your first name' value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                            <label>Last Name</label>
                            <input type='text' placeholder='Enter your last name' value={lastName} onChange={(e) => setlastName(e.target.value)} />
                            <label>Email</label>
                            <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Are You</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value='photographer'>Photographer</option>
                                <option value='client'>Client</option>
                                <option value='admin'>Admin</option>
                            </select>
                            <Button type='submit' className='glass-dark-ash button'>Next</Button>
                        </form>
                        <p>Already have an account? <a href='/login'>login</a></p>
                    </div>
                </div>
            </div>
        );
    } else if (step == 2)
     {
        return (
        <div className='login-form'>
                <div className='feature-image'></div>
                <div className='form-container ' style={{ backgroundImage: `url(${LoginBackground})` }}>
                    <div className='form '>
                        <p>Hi {firstName}</p>
                        <h1>Complete your profile</h1>
                        <form className='field' >
                            <label>Username</label>
                            <input type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Profile Image
                                <input type='file' className='file-upload' onChange={(e) => setProfileImage(e.target.files[0])} />
                            </label>
                            <label>Password</label>
                            <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>Confirm Password</label>
                            <input type='password' placeholder='Confirm your password' 
                                onChange={(e) => {
                                    if (e.target.value == password) {
                                        setConfirmPassword(e.target.value);
                                        console.log("Passwords matched");
                                    }
                                    else {
                                        console.log("Passwords do not match");   
                                    }
                                }}
                            />
                            <div style={{display:'flex'}}>
                                <Button type='button' onClick={() => { setStep(1) }} className='glass-dark-ash button'>Previous</Button>
                                <div className='space'></div>
                                <Button type='submit' onClick={handleSubmit} className='glass-dark-ash button'>Register</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default RegisterForm
