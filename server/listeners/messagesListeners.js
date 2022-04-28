import { getDb } from '../db/connection.js';
import { getNextSequenceValue } from '../db/getNextId.js';
import { createMessage } from '../models/messageModel.js';

export const messageListeners = {
    newMessage: (socket) => async (messageObject) => {
        const db = getDb();
        const messagesCollection = db.collection('messages');
        const {
            user_id,
            chat_id,
            message,
        } = messageObject;

        const newMessage = createMessage(await getNextSequenceValue('messageid'), user_id, chat_id, message);
        try {
            await messagesCollection.insertOne(newMessage);
            socket.broadcast.to(messageObject.chat_id).emit('new message', messageObject.message);
            socket.emit('message sent', true);
        } catch (err) {
            socket.emit('error', err);
            console.log(err);
        }
    },
};
