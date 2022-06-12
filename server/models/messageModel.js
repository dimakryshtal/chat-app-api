export const createMessage = (user_id, chat_id, message, date) => ({
    user_id,
    chat_id,
    message,
    date,
    readby: [],
});
