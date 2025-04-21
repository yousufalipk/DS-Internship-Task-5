import React, { useEffect } from 'react';

import CarouselPage from '../../components/Carousel/Carousel';
import BlogsPage from '../../components/Blogs/Blogs';
import AboutPage from '../../components/About/About';
import Reviews from '../../components/Reviews/Reviews';
import ContactPage from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

import { motion } from "framer-motion"


import { useUser } from '../../context';

const Home = () => {

    const { blogs, fetchBlogs } = useUser();

    useEffect(() => {
        if (blogs.length === 0) {
            fetchBlogs();
        }
    })

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <motion.section
                id="home"
                className="w-full h-[100vh] flex justify-between items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <CarouselPage />
            </motion.section>

            <motion.section
                id="home"
                className="w-full h-[100vh] flex justify-between items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <AboutPage />
            </motion.section>

            {blogs.length > 0 && (
                <motion.section
                    id="home"
                    className="w-full h-[60vh] flex justify-between items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <BlogsPage />
                </motion.section>
            )}

            <motion.section
                id="home"
                className="w-full h-[100vh] flex justify-between items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <Reviews />
            </motion.section>

            <motion.section
                id="home"
                className="w-full h-[70vh] flex justify-between items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <ContactPage />
            </motion.section>

            <Footer />
        </div>
    )
}

export default Home;
