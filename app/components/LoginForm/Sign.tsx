'use client';
import React, { useState } from 'react'
import "@/app/ui/styles/forms/authForms/login.scss";
import TextInput from '../UI/Input';
import Button from '../UI/Button';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/api/services/userService';

import * as Yup from 'yup';

const signInSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function SignIn() {
    const router = useRouter();
    const handleRouteSelect = () => {
        router.push(`/login/`);
    }
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<any>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInSchema.validate({ username, email, password }, { abortEarly: false });
            setErrors({});
            const res = await registerUser(username, password);
            if (res.ok) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (err: any) {
            if (err.inner) {
                const errorObj: Record<string, string> = {};
                err.inner.forEach((e: any) => {
                    if (e.path) errorObj[e.path] = e.message;
                });
                setErrors(errorObj);
            } else {
                setErrors({ general: err.message });
            }
        }
    };

    return (
        <form className='login-form-wrapper' onSubmit={handleSubmit}>
            <div className='login-form-block'>
                <div className='login-title'>Sign in an account</div>
                <div className='login-input-list'>
                    <TextInput
                        className='login-input'
                        label='Username'
                        value={username}
                        onChange={(value) => setUsername(value)}
                        placeholder='( e.g. JohnDoe123 )'
                        required
                        errorMessage={errors.username}
                        isError={!!errors.username}
                    />
                    <TextInput
                        className='login-input'
                        label='Email'
                        value={email}
                        onChange={(value) => setEmail(value)}
                        placeholder='( e.g. johndoe01@gmail.com )'
                        required
                        errorMessage={errors.email}
                        isError={!!errors.email}
                    />
                    <TextInput
                        className='login-input'
                        label='Password'
                        value={password}
                        onChange={(value) => setPassword(value)}
                        placeholder='Password must be at least 8 characters long'
                        required
                        errorMessage={errors.password}
                        isError={!!errors.password}
                    />
                </div>
                <div className='login-button'>
                    <Button
                        className='login-btn'
                        label='Log In'
                        onClick={() => console.log("logging in")}
                        type="submit"
                    />
                    <div className='auth-suggestion'>
                        <span>Already have an account?</span>
                        <span className='auth-link' onClick={() => handleRouteSelect()}>Log In</span>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SignIn;