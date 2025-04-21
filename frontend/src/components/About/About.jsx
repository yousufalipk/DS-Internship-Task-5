import React from 'react';
import AboutSvg from '../../assets/about.svg';

const About = () => {
    return (
        <div id='about' className='w-full min-h-[100vh] flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 lg:px-20 gap-2 mt-5'>
            <h1 className='w-full text-center font-semibold text-green-500 text-3xl sm:text-4xl py-2'>
                About Us
            </h1>
            <hr className='w-[80%] text-green-500' />
            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8 mt-4'>
                <div className='w-full lg:w-1/2 text-gray-500 flex flex-col justify-center items-start gap-5 text-justify text-base sm:text-lg'>
                    <p>
                        <span className='text-green-500 font-semibold'>Explore Pakistan</span> is your digital gateway to the beauty, culture, and history of one of the most diverse and captivating countries in the world. Our mission is to showcase the hidden gems, natural wonders, and rich heritage that make Pakistan a truly unforgettable destination.
                    </p>
                    <p>
                        Whether you're an adventurer seeking mountain escapes, a history buff intrigued by ancient civilizations, or a foodie chasing authentic flavors, Explore Pakistan offers something for everyone. We believe that every corner of Pakistan has a story to tell—from the bustling streets of Lahore to the peaceful valleys of Skardu.
                    </p>
                    <p>
                        Our team is passionate about promoting tourism in Pakistan through stunning visuals, well-researched travel guides, and inspiring content that captures the spirit of this beautiful land. We aim to encourage local and international travelers to experience the warmth of Pakistani hospitality and the magic that lies within its landscapes.
                    </p>
                    <p>
                        Join us on this journey and see Pakistan through a lens of wonder, culture, and adventure.
                    </p>
                </div>
                <div className='w-full lg:w-1/2 flex justify-center items-center'>
                    <img src={AboutSvg} alt="aboutUs-svg" className='w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px]' />
                </div>
            </div>
        </div>
    );
};

export default About;
