'use client';
import React from 'react'
import "@/app/ui/styles/forms/authForms/login.scss";
import TextInput from '../UI/Input';
import Button from '../UI/Button';

function Login() {
  return (
    <div className='login-form-wrapper'>
      <div className='login-form-block'>
        <div className='login-title'>Log In an account</div>
        <div className='login-input-list'>
          <TextInput className='login-input' label='Username' value='' onChange={() => console.log(1)} placeholder='( e.g. JohnDoe123 )' required />
          <TextInput className='login-input' label='Password' value='' onChange={() => console.log(1)} placeholder='Password must be at least 8 characters long' required/>
        </div>
        <div className='login-button'>
          <Button className='login-btn' label='Log In' onClick={() => console.log("logging in")} />
          <div className='auth-suggestion'>
            <span>Don't have an account?</span>
            <span className='auth-link'>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;