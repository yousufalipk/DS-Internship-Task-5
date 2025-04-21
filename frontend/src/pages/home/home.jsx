import React, { useEffect } from 'react';

import CarouselPage from '../../components/Carousel/Carousel';
import BlogsPage from '../../components/Blogs/Blogs';
import AboutPage from '../../components/About/About';
import Reviews from '../../components/Reviews/Reviews';
import ContactPage from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

import { motion } from "framer-motion";
import { useUser } from '../../context';

const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};

const Home = () => {
    const { blogs, fetchBlogs } = useUser();

    useEffect(() => {
        if (blogs.length === 0) {
            fetchBlogs();
        }
    }, [blogs, fetchBlogs]);

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <motion.section
                id="home"
                className="w-full min-h-[100vh] flex justify-between items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionVariants}
            >
                <CarouselPage />
            </motion.section>

            <motion.section
                className="w-full min-h-[100vh] flex justify-between items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionVariants}
            >
                <AboutPage />
            </motion.section>

            {blogs.length > 0 && (
                <motion.section
                    className="w-full min-h-[60vh] flex justify-between items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={sectionVariants}
                >
                    <BlogsPage />
                </motion.section>
            )}

            <motion.section
                className="w-full min-h-[100vh] flex justify-between items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionVariants}
            >
                <Reviews />
            </motion.section>

            <motion.section
                className="w-full min-h-[70vh] flex justify-between items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionVariants}
            >
                <ContactPage />
            </motion.section>

            <Footer />
        </div>
    );
};

export default Home;
