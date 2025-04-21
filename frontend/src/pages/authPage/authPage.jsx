import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignUpForm/SignUpForm';

const AuthPage = () => {
    const [page, setPage] = useState('login');

    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 gap-5'>
            <h1 className='text-center font-bold text-green-500 text-3xl'>
                {page === 'login' ? 'Log In' : 'Sign Up'}
            </h1>
            <hr className='w-[60%] md:w-[50%] text-green-500' />
            <div className='w-full md:w-[60%] lg:w-[50%]'>
                {page === 'login' ? (
                    <LoginForm />
                ) : (
                    <SignupForm />
                )}
            </div>
            <div className='w-full flex justify-center items-center'>
                <button
                    onClick={() => {
                        if (page === 'login') {
                            setPage('signup');
                        } else {
                            setPage('login');
                        }
                    }}
                    className='w-full text-green-500 hover:text-gray-500 hover:cursor-pointer transition-all duration-300 text-center'
                >
                    {page === 'login' ? 'Create Account, Sign Up' : 'Already a user, Login'}
                </button>
            </div>
        </div>
    )
}

export default AuthPage;
