import React from 'react';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';

const ViewBlog = () => {
    const { viewBlog, setViewBlog } = useUser();
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center px-4 py-8 md:px-10 lg:px-20'>
            {viewBlog && (
                <div className='w-full flex flex-col justify-start items-start gap-6'>
                    <div className='w-full flex justify-end'>
                        <button
                            onClick={() => {
                                setViewBlog(null);
                                navigate('/#blogs');
                            }}
                            className='py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition-all duration-300'>
                            Back
                        </button>
                    </div>
                    <div className='w-full flex flex-col justify-start items-center gap-4'>
                        <h1 className='text-center text-green-500 font-bold text-2xl md:text-3xl'>{viewBlog.title}</h1>
                        <hr className='w-4/5 border-green-500' />
                        <img
                            src={viewBlog.photoPath}
                            alt="blog_img"
                            className='w-full max-w-md h-auto object-cover rounded-md'
                        />
                        <p
                            className='text-gray-700 text-justify text-base sm:text-lg'
                            dangerouslySetInnerHTML={{
                                __html: viewBlog.content,
                            }}
                        ></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBlog;
