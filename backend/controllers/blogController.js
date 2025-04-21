import BlogModel from '../schemas/blog.js';
import UserModel from '../schemas/user.js';
import { v2 as cloudinary } from 'cloudinary';

export const createBlog = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const file = req.file;

        const user = await UserModel.findById(userId);

        if (!user || !user.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized to perform this action!'
            });
        }

        const newBlog = new BlogModel({
            title,
            content,
            photoPath: file.path,
            cloudinaryPublicId: file.filename,
            userId
        });

        await newBlog.save();

        return res.status(200).json({
            status: 'success',
            message: 'Blog created successfully!',
            blog: newBlog
        });
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { userId, blogId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user || !user.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized to perform this action!'
            });
        }

        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(200).json({
                status: 'failed',
                message: 'Blog not found!'
            });
        }

        if (blog.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(blog.cloudinaryPublicId);
        }

        await BlogModel.findByIdAndDelete(blogId);

        return res.status(200).json({
            status: 'success',
            message: 'Blog removed successfully!'
        });
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { userId, blogId, newBlogTitle, newBlogContent } = req.body;
        const file = req.file;

        const user = await UserModel.findById(userId);
        if (!user || !user.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized to perform this action!'
            });
        }

        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(200).json({
                status: 'failed',
                message: 'Error updating blog!'
            });
        }

        if (blog.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(blog.cloudinaryPublicId);
        }

        blog.title = newBlogTitle;
        blog.content = newBlogContent;
        blog.photoPath = file.path;
        blog.cloudinaryPublicId = file.filename;

        await blog.save();

        return res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully!',
            newBlog: blog
        });
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

export const fetchBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();

        if (blogs.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'Blogs not found!'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Blogs fetched successfully!',
            blogs
        });
    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};
