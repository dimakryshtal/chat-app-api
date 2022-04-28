import { getDb } from '../db/connection.js';

export const messageController = {
    loadMessages: async (req, res) => {
        const db = getDb();
        const messagesCollection = db.collection('messages');
        const { chatid } = req.params;

        try {
            const messages = await messagesCollection
                .find({ chat_id: Number(chatid) })
                .sort({ $natural: 1 })
                .limit(1000)
                .toArray();

            res.json({ messages, message: 'Messages have been fetcehd successfully' });
        } catch (err) {
            res.status(404).json({ result: 'Error', message: err });
        }
    },
};
