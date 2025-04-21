import { buffer } from 'stream/consumers';
import BlogModel from '../schemas/blog.js';
import UserModel from '../schemas/user.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { BACKEND_PATH } from '../config/env.js';

export const createBlog = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const file = req.file;

        const user = await UserModel.findById(userId);

        if (!user && !user.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized to perfrom this action!'
            })
        }

        const newBlog = new BlogModel({
            title: title,
            content: content,
            photoPath: `${BACKEND_PATH}/storage/${file.filename}`,
            userId: userId
        })

        await newBlog.save();

        return res.status(200).json({
            status: 'success',
            message: 'Blog created succesfully!',
            blog: newBlog
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { userId, blogId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user && !user.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized to perfrom this action!'
            })
        }

        const blog = await BlogModel.findById(blogId);
        const photoName = blog.photoPath.split('/').pop();
        const imagePath = path.join('storage', photoName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await BlogModel.findByIdAndDelete(blogId);

        return res.status(200).json({
            status: 'success',
            message: 'Blog Removed Succesfully!'
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { userId, blogId, newBlogTitle, newBlogContent } = req.body;
        const file = req.file;

        const user = await UserModel.findById(userId);

        if (!user && !user.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized to perfrom this action!'
            })
        }

        const blog = await BlogModel.findById(blogId);

        if (!blog) {
            return res.status(200).json({
                status: 'failed',
                message: 'Error updating blog!'
            })
        }

        const photoName = blog.photoPath.split('/').pop();
        const imagePath = path.join('storage', photoName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        blog.title = newBlogTitle;
        blog.content = newBlogContent;
        blog.photoPath = `${BACKEND_PATH}/storage/${file.filename}`;

        await blog.save();

        return res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully!',
            newBlog: blog
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

export const fetchBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();

        if (blogs.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'Blogs not found!'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Blogs fetched succesfully!',
            blogs: blogs
        })
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}