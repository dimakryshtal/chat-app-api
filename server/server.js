import http from 'http';
import { Server } from 'socket.io';
import { connectToDB } from './db/connection.js';
import 'dotenv/config';
import { Socket } from './sockets/socketController.js';
import { app } from './app.js';

const server = http.createServer(app);
const io = new Server(server);
const socket = new Socket(io);

socket.socketEvents(socket);

server.listen(process.env.API_PORT, async () => {
    await connectToDB();
    console.log('Server started on port 8080');
});
