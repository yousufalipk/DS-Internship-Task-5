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
        <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
            <div className='w-full h-[10vh]'></div>
            <div className='w-full h-[90vh] flex justify-center items-center'>
                <div className='relative w-[20%] h-full flex flex-col justify-start items-start'>
                    <div className='w-full h-full absolute bg-black opacity-70'></div>
                    <button
                        onClick={() => {
                            navigate('/dashboard');
                        }}
                        className='p-5 z-0 hover:text-green-500 hover:border-green-500 font-semibold text-white hover:cursor-pointer duration-300 transition-all w-[80%] border-b border-white mx-auto hover:scale-105'
                    >
                        Manage Blogs
                    </button>
                    <button
                        onClick={() => {
                            navigate(`/dashboard/manage/${null}`)
                        }}
                        className='p-5 z-0 hover:text-green-500 hover:border-green-500 font-semibold text-white hover:cursor-pointer duration-300 transition-all w-[80%] border-b border-white mx-auto hover:scale-105'
                    >
                        Create / Update Blog
                    </button>
                    <div className='w-full absolute flex flex-col justify-center items-start pl-5 bottom-[2%]'>
                        <button
                            onClick={() => {
                                handleLogout()
                            }}
                            className='bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-md hover:cursor-pointer transition-all duration-300'
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                <div className='w-[80%] h-full flex flex-col justify-center items-center'>
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
