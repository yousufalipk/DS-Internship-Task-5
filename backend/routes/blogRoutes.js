import express from 'express';
import path from 'path';
const router = express();
import {
    createBlog,
    deleteBlog,
    updateBlog,
    fetchBlogs
} from '../controllers/blogController.js';

import multer from 'multer';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/env.js';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'explorePakistan',
        format: async (req, file) => 'png',
        public_id: (req, file) => `${Date.now()}-${req.body.userId}`
    },
});

const upload = multer({ storage });

router.get('/fetch', fetchBlogs);

router.delete('/remove', deleteBlog);

router.post('/create', upload.single('photo'), createBlog);

router.post('/update', upload.single('photo'), updateBlog);

export default router;