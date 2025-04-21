import React from 'react';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';

const ViewBlog = () => {
    const { viewBlog, setViewBlog } = useUser();
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-center items-center'>
            {viewBlog && (
                <div className='w-full min-h-[100vh] flex flex-col justify-start items-start px-20 pt-25'>
                    <div className='w-full flex justify-end items-center'>
                        <button
                            onClick={() => {
                                setViewBlog(null);
                                navigate('/#blogs')
                            }}
                            className='py-2 px-5 bg-red-500 hover:bg-red-600 text-white font-bold hover:scale-105 hover:cursor-pointer rounded-md'>
                            Back
                        </button>
                    </div>
                    <div className='w-full h-full flex flex-col justify-start items-center gap-2'>
                        <h1 className='w-full text-center text-green-500 font-bold text-3xl'>{viewBlog.title}</h1>
                        <hr className='w-[80%] text-green-500' />
                        <img src={viewBlog.photoPath} alt="blog_img" className='w-[30%] h-[25%] overflow-hidden' />
                        <p
                            className="excerpt line-clamp-2"
                            dangerouslySetInnerHTML={{
                                __html: viewBlog.content.substring(0, 110) + "...",
                            }}
                        ></p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewBlog;
