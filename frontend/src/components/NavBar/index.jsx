import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/index';
import { Menu, X } from 'lucide-react';

let defaultSections = [
    { name: "Home", id: "#carousel" },
    { name: "About", id: "#about" },
    { name: "Blogs", id: "#blogs" },
    { name: "Reviews", id: "#reviews" },
    { name: "Contact", id: "#contact" }
];

const NavBar = () => {
    const navigate = useNavigate();
    const { blogs } = useUser();
    const [sections, setSections] = useState(defaultSections);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (blogs.length === 0) {
            setSections(defaultSections.filter(section => section.name !== 'Blogs'));
        } else {
            setSections(defaultSections);
        }
    }, [blogs]);

    const handleNavClick = (id) => {
        navigate('/');
        setTimeout(() => {
            const el = document.querySelector(id);
            el?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        setMenuOpen(false);
    };

    return (
        <div className='w-full h-[10vh] flex justify-between items-center shadow-md fixed z-30 top-0'>
            <div className='absolute z-10 w-full h-full bg-black opacity-70'></div>
            <div className='w-full h-full absolute z-20 flex justify-between items-center md:px-20 px-8'>
                <a
                    onClick={() => navigate('/')}
                    href='#carousel'
                    className='text-2xl text-green-500 font-semibold z-40 hover:text-green-600 transition-all duration-300'
                >
                    ExplorePakistan
                </a>

                <div className='hidden md:flex gap-6 z-40'>
                    {sections.map((s, i) => (
                        <a
                            key={i}
                            href={s.id}
                            onClick={() => handleNavClick(s.id)}
                            className='text-green-500 hover:text-gray-200 transition-all duration-300 hover:font-bold'
                        >
                            {s.name}
                        </a>
                    ))}
                </div>

                <button
                    className='md:hidden z-40 text-green-500'
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>

                <div
                    className={`fixed top-0 right-0 h-screen w-[75%] text-white z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className='absolute z-0 w-full h-full bg-black opacity-90'></div>
                    <div className='w-full h-full absolute z-50'>
                        <div className='flex justify-between items-center p-4 border-b border-gray-700'>
                            <span className='text-xl font-semibold text-green-500'>Menu</span>
                            <button onClick={() => setMenuOpen(false)} className='text-gray-300 hover:text-white'>
                                <X size={24} />
                            </button>
                        </div>
                        <div className='flex flex-col gap-4 p-6'>
                            {sections.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.id}
                                    onClick={() => handleNavClick(s.id)}
                                    className='text-lg text-green-400 hover:text-white transition'
                                >
                                    {s.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {menuOpen && (
                        <div
                            className='fixed inset-0 bg-opacity-50 z-40'
                            onClick={() => setMenuOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
