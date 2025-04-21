import * as Yup from 'yup';

export const ContactSchema = Yup.object({
    name: Yup.string().min(2).max(50).required('Name is required!'),
    email: Yup.string().email().required('Email is required!'),
    message: Yup.string().min(10).max(150).required('Message is required!')
});