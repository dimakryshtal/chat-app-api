export const createMessage = (message_id, user_id, chat_id, message) => ({
    message_id,
    user_id,
    chat_id,
    message,
    readby: [],
});
