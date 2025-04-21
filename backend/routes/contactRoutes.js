import express from 'express';

const router = express.Router();

import {
    sendMessage
} from '../controllers/contactController.js';

router.post('/send', sendMessage);

export default router;