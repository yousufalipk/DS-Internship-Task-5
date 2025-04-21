import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/index';
import CreateOrUpdateBlog from './blogs/createOrUpdateBlog';
import BlogsPage from './blogs/index';
import { Routes, Route } from 'react-router-dom';

const Dashboard = () => {
    const { logOutUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            const res = logOutUser();
            if (res.success) {
                toast.success(res.mess);
            } else {
                toast.error(res.mess)
            }
        } catch (error) {
            toast.error('Internal Server Error');
        }
    }

    return (
        <div className='w-full min-h-screen flex flex-col'>
            <div className='w-full h-[10vh]'></div>
            <div className='w-full flex flex-col lg:flex-row flex-1'>
                <div className='relative w-full lg:w-[20%] h-[300px] lg:h-full flex flex-col items-start'>
                    <div className='absolute inset-0 bg-black opacity-70'></div>
                    <button
                        onClick={() => {
                            navigate('/dashboard');
                        }}
                        className='p-5 z-10 hover:text-green-500 hover:border-green-500 font-semibold text-white hover:cursor-pointer duration-300 transition-all w-[80%] border-b border-white mx-auto hover:scale-105'
                    >
                        Manage Blogs
                    </button>
                    <button
                        onClick={() => {
                            navigate(`/dashboard/manage/${null}`)
                        }}
                        className='p-5 z-10 hover:text-green-500 hover:border-green-500 font-semibold text-white hover:cursor-pointer duration-300 transition-all w-[80%] border-b border-white mx-auto hover:scale-105'
                    >
                        Create / Update Blog
                    </button>
                    <div className='absolute z-10 flex flex-col justify-center items-start pl-5 bottom-4'>
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-md hover:cursor-pointer transition-all duration-300'
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                <div className='w-full lg:w-[80%] h-full flex justify-center items-center p-4'>
                    <Routes>
                        <Route path='/' element={<BlogsPage />} />
                        <Route path='manage/:id' element={<CreateOrUpdateBlog />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
