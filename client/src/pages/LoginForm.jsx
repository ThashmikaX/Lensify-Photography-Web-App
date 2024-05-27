import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css'
import LoginBackground from '../assets/images/login-bg.jpg'
import { useState } from "react";
import axios from 'axios';
import { useAuth } from '../auth/Auth';
import { Button } from '../components';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, auth } = useAuth();

    const handleSubmit = async (event) => {
        console.log('Login button');
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            console.log(response.data.message); // 'Logged in successfully.'
            login(response.data.userId);
            login(response.data.userId);
            console.log(auth.userId); // { userId: '60f7b1f3f7e8e6b0b4d3b5b3' }
        }
        catch (error) {
            console.error(error);
        }
        };
    
  return (
      <div className='login-form'>
        <div className='feature-image'></div>
        <div className='form-container ' style={{ backgroundImage: `url(${LoginBackground})` }}>
            <div className='form '>
                <h1>Login</h1>
                <form className='field' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type='submit' className='glass-dark-ash button'>Login</Button>
                </form>
                <p><span className='frogot-pw'>Forgot your password? <a href='#'>Reset</a></span></p>
                <p>Don't have an account? <a href='/register'>Register</a></p>
              </div>
          </div>
    </div>
  )
}

export default LoginForm
