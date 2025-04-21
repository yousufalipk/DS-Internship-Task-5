import React from 'react';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const { blogs, setViewBlog } = useUser();
    const navigate = useNavigate();

    return (
        <div id='blogs' className='w-full min-h-[60vh] flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 lg:px-20 gap-2'>
            <h1 className='w-full text-center font-semibold text-green-500 text-3xl sm:text-4xl py-2'>
                Latest Blogs
            </h1>
            <hr className='w-[80%] text-green-500' />
            <div className='w-full flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-4'>
                {blogs.map((b, i) => {
                    return (
                        <div
                            onClick={() => {
                                setViewBlog(b);
                                navigate('/view-blog')
                            }}
                            key={i}
                            className='w-full sm:w-[45%] md:w-[30%] lg:w-[25%] rounded-md shadow-lg overflow-hidden flex flex-col justify-start items-start p-3 gap-2 hover:scale-105 hover:cursor-pointer hover:shadow-green-200 transition-all duration-300'
                        >
                            <img src={b.photoPath} alt="image" className='w-full h-40 object-cover border border-gray-200 shadow-sm rounded-md' />
                            <h1 className='w-full text-green-500 font-bold text-start line-clamp-1'>
                                {b.title}
                            </h1>
                            <p
                                className="excerpt line-clamp-2 text-sm text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: b.content.substring(0, 110) + "...",
                                }}
                            ></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Blogs;
