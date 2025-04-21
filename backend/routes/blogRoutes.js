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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.png';
        const filename = `${Date.now()}-${req.body.userId}.png`;
        console.log('Filename', filename);
        cb(null, filename);
    }
});

const upload = multer({ storage });

router.get('/fetch', fetchBlogs);

router.delete('/remove', deleteBlog);

router.post('/create', upload.single('photo'), createBlog);

router.post('/update', upload.single('photo'), updateBlog);

export default router;