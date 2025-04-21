import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div id='footer' className='w-full h-[10vh] flex flex-col justify-center items-center px-20 text-green-500 relative'>
            <hr className='w-[80%] text-green-500' />
            <div className='w-full h-full flex justify-between items-center'>
                <p className='text-green-500'>Copyright © 2025. All Rights Are Reserved</p>
                <button
                    onClick={() => {
                        navigate('/dashboard')
                    }}
                    className='w-20 hover:scale-105 text-green-500 hover:font-bold transition-all duration-300 hover:cursor-pointer hover:text-gray-500 font-semibold'
                >
                    Dashboard
                </button>
            </div>
        </div >
    )
}

export default Footer;
