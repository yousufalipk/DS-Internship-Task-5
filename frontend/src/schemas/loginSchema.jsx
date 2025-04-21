import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    email: Yup.string().email().min(3).max(50).required('Email is required!'),
    password: Yup.string().min(8).max(16).required('Password is required!')
})