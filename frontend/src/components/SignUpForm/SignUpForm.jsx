import React, { useState } from 'react';
import { useFormik } from 'formik';
import { SignUpSchema } from '../../schemas/signUpSchema';
import { toast } from 'react-toastify';
import { useUser } from '../../context/index';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const { registerUser } = useUser();

    const [registring, setRegistring] = useState(false);

    const { errors, touched, handleChange, handleBlur, handleReset, handleSubmit, values } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: async (values) => {
            try {
                setRegistring(true);

                const res = await registerUser(values);

                if (res.success) {
                    toast.success(res.mess);
                } else {
                    toast.error(res.mess);
                }

            } catch (error) {
                toast.error('Internal Server Error');
            } finally {
                handleReset();
                setRegistring(false);
            }
        }
    })


    return (
        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center gap-5'>
            <input
                type="text"
                name='firstName'
                id='firstName'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='First Name'
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.firstName && touched.firstName && (
                <p className='text-center text-red-500 w-full'>
                    {errors.firstName}
                </p>
            )}
            <input
                type="text"
                name='lastName'
                id='lastName'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Last Name'
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.lastName && touched.lastName && (
                <p className='text-center text-red-500 w-full'>
                    {errors.lastName}
                </p>
            )}
            <input
                type="text"
                name='email'
                id='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Email'
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.email && touched.email && (
                <p className='text-center text-red-500 w-full'>
                    {errors.email}
                </p>
            )}
            <input
                type="password"
                name='password'
                id='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Password'
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.password && touched.password && (
                <p className='text-center text-red-500 w-full'>
                    {errors.password}
                </p>
            )}
            <input
                type="password"
                name='confirmPassword'
                id='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Confirm Password'
                className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
            />
            {errors.confirmPassword && touched.confirmPassword && (
                <p className='text-center text-red-500 w-full'>
                    {errors.confirmPassword}
                </p>
            )}
            <button
                type='submit'
                className='w-full p-2 text-white font-bold bg-green-500 hover:bg-green-600 rounded-md hover:cursor-pointer transition-all duration-300'
            >
                {registring ? 'Registration...' : 'Sign Up'}
            </button>
        </form>
    )
}

export default SignUpForm;
