import express from 'express';
import { messageController } from '../controllers/messagesController.js';

export const messagesRouter = express.Router();

messagesRouter
    .get('/messagesfrom/:chatid', messageController.loadMessages);
