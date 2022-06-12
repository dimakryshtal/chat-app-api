import { ObjectId } from 'mongodb';
import { getDb } from '../db/connection.js';
import { getNextSequenceValue } from '../db/getNextId.js';
import { createChatRoom } from '../models/chatRoomModel.js';

export const chatRoomContoller = {
    createChat: async (req, res) => {
        const db = getDb();
        const {
            user_ids,
            chatType,
        } = req.body;
        const newChatRoom = createChatRoom(chatType === 'test' ? 0 : (await getNextSequenceValue('chatroomid')), chatType, user_ids);
        try {
            await db.collection('chatRooms').insertOne(newChatRoom);
            res.status(200).json({ result: 'Success', message: 'A new chat room has been created successfully' });
        } catch (err) {
            res.json({ result: 'Error', message: err });
        }
    },

    findChat: async (req, res) => {
        const db = getDb();
        const { id } = req.params;

        try {
            const chat = await db.collection('chatRooms').findOne({ chatRoom_id: Number(id) });
            res.status(200).send({ chat, message: 'The chat is found' });
        } catch (err) {
            res.status(404).send({ result: 'Error', err });
        }
    },

    loadAllUsersChats: async (req, res) => {
        const db = getDb();

        const chatIDs = req.query.id.split(',').map((x) => new ObjectId(x));
        try {
            const chats = await db.collection('chatRooms').find({ _id: { $in: chatIDs } }).toArray();
            res.status(200).json({ chats, message: 'All chats have been fetched successfully' });
        } catch (err) {
            res.json({ result: 'Error', message: err });
        }
    },
    deleteUserChatById: async (req, res) => {
        const db = getDb();
        const chatRooms = db.collection('chatRooms');
        const { id } = req.params;

        try {
            await chatRooms.deleteOne({ chatRoom_id: Number(id) });
            res.status(202).json({ result: 'Success', message: 'The chat room has been deleted successfully' });
        } catch (err) {
            res.status(404).json({ result: 'Error', message: err });
        }
    },
    addUsersToChat: async (req, res) => {
        const db = getDb();
        const chatRooms = db.collection('chatRooms');
        const {
            chat_id,
            user_ids,
        } = req.body;
        try {
            await chatRooms.updateOne({
                chatRoom_id: Number(chat_id),
            }, {
                $push: { user_ids: { $each: user_ids } },
            });
            res.status(200).json({ result: 'Success', message: 'Users have been added successfully' });
        } catch (err) {
            res.status(404).json({ result: 'Error', message: err });
        }
    },
};
