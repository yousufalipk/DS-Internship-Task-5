import React from 'react';
import StarSvg from '../../assets/star.svg';

const Reviews = () => {

    const testimonials = [
        {
            name: "Ayesha Khan",
            location: "Lahore",
            rating: 5,
            title: "Exploring Hunza through this platform was a dream come true!",
            content: "The travel tips and location insights were spot on. My trip to Hunza was perfectly planned, and I felt like I had a local guide with me every step of the way."
        },
        {
            name: "Usman Raza",
            location: "Islamabad",
            rating: 5,
            title: "I rediscovered Pakistan through this website.",
            content: "I’ve been to places I didn’t even know existed. From Kund Malir to Fairy Meadows, this site helped me plan unforgettable adventures with my friends."
        },
        {
            name: "Mahnoor Ali",
            location: "Karachi",
            rating: 5,
            title: "The cultural guides are a must-read for anyone traveling!",
            content: "As someone who loves heritage sites, the detailed articles about Mohenjo-Daro and Taxila made my solo trip so much more meaningful."
        },
        {
            name: "Imran Javed",
            location: "Faisalabad",
            rating: 5,
            title: "Highly recommended for family trips.",
            content: "We planned our Swat vacation using Explore Pakistan and everything was smooth. From hotel suggestions to travel safety—it was all so helpful."
        }
    ];


    return (
        <div id='reviews' className='w-full h-[70vh] flex flex-col justify-center items-center gap-2 px-20'>
            <h1 className='w-full text-center font-semibold text-green-500 text-4xl py-2'>
                What people say about us?
            </h1>
            <hr className='w-[80%] text-green-500' />
            <div className='w-full h-[80%] grid grid-cols-2 grid-rows-2 place-items-center my-5'>
                {testimonials.map((t, i) => {
                    const stars = Array(t.rating).fill(null);
                    return (
                        <div key={i} className='w-[90%] h-[90%] rounded-md bg-white shadow-md p-4 flex flex-col justify-start items-start text-gray-500 gap-2'>
                            <h1 className='text-md font-bold'>{t.name}, <span className='text-sm font-semibold'>{t.location}</span></h1>
                            <div className='w-full flex justify-start items-center gap-1'>
                                {stars.map((s, i) => {
                                    return (
                                        <img key={i} src={StarSvg} alt="star" width='20px' height='20px' />
                                    )
                                })}
                            </div>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h2 className='font-semibold'>{t.title}</h2>
                                <p className='text-start'>{t.content}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Reviews;
