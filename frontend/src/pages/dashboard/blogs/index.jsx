import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Blogs = () => {
    const navigate = useNavigate();
    const { user, blogs, setBlogs, fetchBlogs, fetching } = useUser();
    const apiUrl = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        if (blogs.length === 0) {
            fetchBlogs();
        }
    }, []);

    const handleDeleteBlog = async (blogId) => {
        try {
            const response = await axios.delete(`${apiUrl}/blog/remove`, {
                data: {
                    userId: user._id,
                    blogId: blogId
                }
            });
            if (response.data.status === 'success') {
                setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
                toast.success('Blog removed successfully!');
            } else {
                toast.error('Error deleting blog!');
            }
        } catch (error) {
            toast.error('Internal Server Error!');
        }
    };

    const handleUpdateBlog = async (blogId) => {
        try {
            navigate(`/dashboard/manage/${blogId}`);
        } catch (error) {
            console.log('Internal Server Error!');
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-start items-center p-4 sm:p-6 md:p-8'>
            <div className='w-full flex flex-col justify-center items-center gap-2 mb-4'>
                <h1 className='text-xl sm:text-2xl md:text-3xl text-green-500 font-bold'>All Blogs</h1>
                <hr className='w-[80%] border-t-2 border-green-500' />
            </div>
            <div className='w-full overflow-x-auto'>
                {blogs.length > 0 ? (
                    <table className='w-full text-sm sm:text-base text-gray-500 border border-gray-300'>
                        <thead>
                            <tr>
                                <th className='text-center border-b border-gray-300 p-2 text-green-500 bg-green-50'>Sr.No</th>
                                <th className='text-center border-b border-gray-300 p-2 text-green-500 bg-green-50'>Title</th>
                                <th className='text-center border-b border-gray-300 p-2 text-green-500 bg-green-50'>Content</th>
                                <th className='text-center border-b border-gray-300 p-2 text-green-500 bg-green-50'>Thumb</th>
                                <th className='text-center border-b border-gray-300 p-2 text-green-500 bg-green-50'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((b, i) => (
                                <tr key={i} className='hover:bg-green-50'>
                                    <td className='text-center border-b border-gray-300 p-2'>{i + 1}</td>
                                    <td className='text-center border-b border-gray-300 p-2'>
                                        {b.title.length > 50 ? `${b.title.slice(0, 50)}...` : b.title}
                                    </td>
                                    <td className='text-center border-b border-gray-300 p-2'>
                                        <p
                                            className="excerpt text-xs sm:text-sm md:text-base"
                                            dangerouslySetInnerHTML={{
                                                __html: b.content.substring(0, 110) + "...",
                                            }}
                                        ></p>
                                    </td>
                                    <td className='border-b border-gray-300 p-2'>
                                        <img
                                            src={b.photoPath}
                                            alt="photo"
                                            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover mx-auto rounded'
                                        />
                                    </td>
                                    <td className='text-center border-b border-gray-300 p-2 flex flex-col sm:flex-row justify-center items-center gap-2'>
                                        <button
                                            onClick={() => handleDeleteBlog(b._id)}
                                            className='text-red-500 hover:text-red-600 hover:scale-105 hover:font-bold transition-all duration-300'
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleUpdateBlog(b._id)}
                                            className='text-green-500 hover:text-green-600 hover:scale-105 hover:font-bold transition-all duration-300'
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='text-red-500 text-center w-full italic mt-4'>
                        {fetching ? 'Fetching blogs please wait!' : 'No blog added!'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Blogs;
