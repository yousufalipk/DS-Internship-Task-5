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
        <div id='contact' className='w-full min-h-[70vh] flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 gap-4'>
            <h1 className='w-full text-center font-semibold text-green-500 text-2xl md:text-3xl lg:text-4xl py-2'>
                Contact Us Now!
            </h1>
            <hr className='w-[90%] md:w-[80%] text-green-500' />
            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                <div className='w-full lg:w-[60%] flex flex-col justify-center items-center'>
                    <img src={ContactSvg} alt="contactUs-svg" className='w-40 md:w-52 lg:w-60' />
                    <div className='w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 text-base md:text-lg text-gray-500'>
                        <div className='flex justify-center items-center gap-2'>
                            <img src={PhoneSvg} alt="phone_svg" className='w-5 h-5' />
                            {contact.phone}
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <img src={EmailSvg} alt="email_svg" className='w-5 h-5' />
                            {contact.email}
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <img src={InstaSvg} alt="insta_svg" className='w-5 h-5' />
                            {contact.instagram}
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-[40%]'>
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
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Message..'
                            id='message'
                            name='message'
                            rows="4"
                            className='w-full p-3 rounded-lg outline-0 shadow-md bg-white text-gray-500'
                        />
                        {errors.message && touched.message && (
                            <p className='text-center text-red-500 w-full'>
                                {errors.message}
                            </p>
                        )}
                        <button
                            type='submit'
                            className='w-full p-2 text-white font-bold bg-green-500 hover:bg-green-600 rounded-md transition-all duration-300'
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
