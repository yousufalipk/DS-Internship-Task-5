import React, { useEffect, useState } from 'react';
import ContactSvg from '../../assets/contact.svg';
import PhoneSvg from '../../assets/phone.svg';
import EmailSvg from '../../assets/email.svg';
import InstaSvg from '../../assets/insta.svg';
import { useFormik } from 'formik';
import { ContactSchema } from '../../schemas/contact';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialValues = {
    name: '',
    email: '',
    message: ''
}

const Contact = () => {
    const [sending, setSending] = useState(false);

    const apiUrl = import.meta.env.VITE_APP_URL;

    const contact = {
        phone: '+92 302122335',
        email: 'ameeryousuf.pk',
        instagram: 'yousufbhatti_1'
    }


    const { errors, values, handleBlur, handleChange, handleReset, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: ContactSchema,
        onSubmit: async (values) => {
            try {
                setSending(true);
                const response = await axios.post(`${apiUrl}/contact/send`, {
                    name: values.name,
                    email: values.email,
                    message: values.message
                });

                if (response.data.status === 'success') {
                    toast.success('Message sent succesfully!')
                } else {
                    toast.error('Error sending message!')
                }

            } catch (error) {
                console.log("Internal Server Error", error);
            } finally {
                setSending(false);
                handleReset();
            }
        }
    })

    return (
        <div id='contact' className='w-full min-h-[70vh] flex flex-col justify-center items-center px-20 gap-2'>
            <h1 className='w-full text-center font-semibold text-green-500 text-4xl py-2'>
                Contact Us Now!
            </h1>
            <hr className='w-[80%] text-green-500' />
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-[60%] h-full flex flex-col justify-center items-center'>
                    <img src={ContactSvg} alt="contactUs-svg" width='200px' height='200px' className='fill-current text-green-600' />
                    <div className='w-full h-[10%] flex justify-center items-center gap-5 text-lg text-gray-500'>
                        <div className='flex justify-center items-center gap-1'>
                            <img src={PhoneSvg} alt="phone_svg" width='20px' height='20px' />
                            {contact.phone}
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <img src={EmailSvg} alt="email_svg" width='20px' height='20px' />
                            {contact.email}
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <img src={InstaSvg} alt="insta_svg" width='20px' height='20px' />
                            {contact.instagram}
                        </div>
                    </div>
                </div>
                <div className='w-[40%] h-full flex justify-center items-center'>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-start gap-4'>
                        <input
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Name'
                            id='name'
                            name='name'
                            className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
                        />
                        {errors.name && touched.name && (
                            <p className='text-center text-red-500 w-full'>
                                {errors.name}
                            </p>
                        )}
                        <input
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Email'
                            id='email'
                            name='email'
                            className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
                        />
                        {errors.email && touched.email && (
                            <p className='text-center text-red-500 w-full'>
                                {errors.email}
                            </p>
                        )}
                        <textarea
                            type="text"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Message..'
                            id='message'
                            name='message'
                            className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
                        />
                        {errors.message && touched.message && (
                            <p className='text-center text-red-500 w-full'>
                                {errors.message}
                            </p>
                        )}
                        <button
                            type='submit'
                            className='w-full p-2 text-white font-bold bg-green-500 hover:bg-green-600 rounded-md hover:cursor-pointer transition-all duration-300'
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;
