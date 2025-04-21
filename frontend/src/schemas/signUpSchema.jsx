import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    firstName: Yup.string().min(3).max(10).required('First name is required!'),
    lastName: Yup.string().min(3).max(10).required('Last name is required!'),
    email: Yup.string().email().min(3).max(50).required('Email is required!'),
    password: Yup.string().min(8).max(16).required('Password is required!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required!')
})