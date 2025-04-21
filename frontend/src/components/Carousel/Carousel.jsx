import React, { useState, useEffect } from 'react';

const content = [
    {
        path: '/1.jpg',
        heading: 'Northern Wonders: Explore the Beauty of Hunza Valley',
        desc: 'From the majestic Rakaposhi to the serene Attabad Lake, discover the natural splendor and cultural richness of Hunza—Pakistan’s crown jewel of the north.'
    },
    {
        path: '/2.jpg',
        heading: 'A Journey Through History: Lahore Awaits',
        desc: 'Wander through the centuries in Lahore, where Mughal architecture, bustling bazaars, and mouth-watering food come together in a city that never sleeps.'
    },
    {
        path: '/3.jpg',
        heading: 'Desert Magic: Discover the Charm of Tharparkar',
        desc: 'Experience the vibrant culture, colorful traditions, and stunning landscapes of the Thar Desert—a hidden gem in the heart of Sindh.'
    },
    {
        path: '/4.jpg',
        heading: 'Coastal Bliss: Karachi and the Arabian Sea',
        desc: `Feel the energy of Pakistan’s largest city—Karachi. From Clifton Beach sunsets to street food adventures, it's where modern life meets timeless tradition.`
    },
]

const Carousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % content.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{ backgroundImage: `url(${content[index].path})` }}
            id='carousel'
            className='w-full min-h-[100vh] flex justify-start items-center bg-center bg-cover relative'
        >
            <div className='w-full h-full bg-black opacity-50 absolute z-10'></div>
            <div className='absolute z-20 bottom-4 right-4 flex justify-center items-center gap-3'>
                {content.map((img, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full border border-gray-200 ${i === index && 'bg-green-500'}`}></div>
                ))}
            </div>
            <div className='w-full h-full absolute z-20 text-white flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 gap-3'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-[90%] md:max-w-[70%] lg:max-w-[50%]'>
                    {content[index].heading}
                </h1>
                <p className='text-sm sm:text-base md:text-lg font-medium leading-6 sm:leading-7 md:leading-8 max-w-[95%] md:max-w-[80%] lg:max-w-[60%]'>
                    {content[index].desc}
                </p>
            </div>
        </div>
    );
};

export default Carousel;
