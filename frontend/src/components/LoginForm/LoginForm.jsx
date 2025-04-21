import React, { useState } from 'react';
import { useFormik } from 'formik';
import { LoginSchema } from '../../schemas/loginSchema';
import { toast } from 'react-toastify';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: '',
    password: ''
}

const LoginForm = () => {
    const [authenticating, setAuthenticating] = useState(false);

    const navigate = useNavigate();

    const { loginUser } = useUser();

    const { errors, touched, handleSubmit, handleChange, handleBlur, handleReset, values } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                setAuthenticating(true);
                const res = await loginUser(values);
                if (res.success) {
                    toast.success(res.mess);
                    navigate('/dashboard');
                } else {
                    toast.error(res.mess)
                }
            } catch (error) {
                toast.error('Internal Server Error');
            } finally {
                handleReset();
                setAuthenticating(false);
            }
        }
    })

    return (
        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center gap-5'>
            <input
                type="text"
                id='email'
                name='email'
                placeholder='Email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.email && touched.email && (
                <p className='text-center text-red-500 w-full'>
                    {errors.email}
                </p>
            )}
            <input
                type="password"
                id='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.password && touched.password && (
                <p className='text-center text-red-500 w-full'>
                    {errors.password}
                </p>
            )}
            <button
                type='submit'
                className='w-full p-2 text-white font-bold bg-green-500 hover:bg-green-600 rounded-md hover:cursor-pointer transition-all duration-300'
            >
                {authenticating ? 'Authenticating...' : 'Log In'}
            </button>
        </form>
    )
}

export default LoginForm;
