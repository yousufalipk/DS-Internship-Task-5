import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/index';

const sections = [
    {
        name: "Home",
        id: "#carousel"
    },
    {
        name: "About",
        id: "#about"
    },
    {
        name: "Blogs",
        id: "#blogs"
    },
    {
        name: "Reviews",
        id: "#reviews"
    },
    {
        name: "Contact",
        id: "#contact"
    },
]

const NavBar = () => {
    const navigate = useNavigate();

    const { blogs } = useUser();

    useEffect(() => {
        if (blogs.length === 0) {
            sections.filter(prevSection => prevSection.name !== 'Blogs')
        }
    }, [blogs])

    return (
        <div className='w-full h-[10vh] flex justify-center items-center shadow-md fixed z-30 top-0'>
            <div className='w-full h-full absolute bg-black opacity-70'></div>
            <a
                onClick={() => {
                    navigate('/');
                }}
                href='#carousel' className='z-40 w-[20%] h-full flex justify-start items-center text-3xl text-green-500 hover:cursor-pointer hover:text-green-600 hover:scale-[102%] transition-all duration-300 font-semibold'>
                ExplorePakistan
            </a>
            <div className='z-40 w-[60%] h-full flex justify-end items-center'>
                {sections.map((s, i) => {
                    return (
                        <a
                            key={i}
                            href={s.id}
                            onClick={() => {
                                navigate('/');
                            }}
                            className='w-20 hover:scale-105 text-green-500 hover:font-bold transition-all duration-300 hover:cursor-pointer hover:text-gray-200'
                        >
                            {s.name}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default NavBar;
