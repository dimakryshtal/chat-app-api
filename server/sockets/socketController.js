import { messageListeners } from '../listeners/messagesListeners.js';

export class Socket {
    constructor(io) {
        this.io = io;
        this.connectedUsers = [];
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('a user connected with id: ', socket.id);

            socket.on('inituser', (userObject) => {
                this.connectedUsers.push({
                    socket_id: socket.id,
                    user_id: userObject.user_id,
                });
                userObject.chats.forEach((el) => {
                    socket.join(el);
                });
                console.log(this.io.sockets.adapter.rooms);
            });

            socket.on('disconnect', () => {
                this.connectedUsers.filter((x) => x.socket_id !== socket.id);
            });

            socket.on('chat message', messageListeners.newMessage(socket));
        });
    }
}
