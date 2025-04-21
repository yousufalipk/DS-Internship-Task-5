import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div id='footer' className='w-full h-[15vh] flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 text-green-500'>
            <hr className='w-[90%] md:w-[80%] text-green-500' />
            <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
                <p className='text-green-500 text-center md:text-left'>
                    Copyright © 2025. All Rights Are Reserved
                </p>
                <button
                    onClick={() => {
                        navigate('/dashboard')
                    }}
                    className='w-20 text-green-500 hover:font-bold hover:scale-105 transition-all duration-300 font-semibold'
                >
                    Dashboard
                </button>
            </div>
        </div>
    )
}

export default Footer;
