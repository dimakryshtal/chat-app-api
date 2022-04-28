import express from 'express';
import { chatRoomContoller } from '../controllers/chatRoomController.js';

export const chatRoomRouter = express.Router();

chatRoomRouter
    .post('/newchat', chatRoomContoller.createChat)
    .get('/loadchats', chatRoomContoller.loadAllUsersChats)
    .get('/loadchat/:id', chatRoomContoller.findChat)
    .post('/addusers/', chatRoomContoller.addUsersToChat)
    .delete('/deletechat/:id', chatRoomContoller.deleteUserChatById);
