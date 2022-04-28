import supertest from 'supertest';
import { app } from '../server/app';
import { connectToDB } from '../server/db/connection';

beforeAll(async () => {
    await connectToDB();
});

describe('Chatroom routes', () => {
    test('if server creates a chat (POST)', async () => {
        const body = {
            user_ids: [0],
            chatType: 'test',
        };

        const response = await supertest(app).post('/newchat').send(body);
        expect(response.statusCode).toBe(200);
    });

    test('if server finds a chat (GET)', async () => {
        const expectedResponse = {
            _id: '622f700fecf10822a3d880a6',
            chatRoom_id: 1,
            chatType: 'private',
            user_ids: [5, 6, 4],
        };

        const response = await supertest(app).get('/loadchat/1');
        expect(response.body.chat).toEqual(expectedResponse);
    });

    test('if server loads all user\'s chats (GET)', async () => {
        const response = await supertest(app).get('/loadchats?id=1,2,3');
        expect(response.body.chats.length).toBe(3);
    });

    test('if server adds users to a particular chat (POST)', async () => {
        const body = {
            chat_id: 0,
            user_ids: [1, 2],
        };

        const expectedResponse = [0, 1, 2];

        await supertest(app).post('/addusers/').send(body);
        const updatedChat = await supertest(app).get('/loadchat/0');
        expect(updatedChat.body.chat.user_ids).toEqual(expectedResponse);
    });

    test('if server deletes a chat (DELETE)', async () => {
        const response = await supertest(app).delete('/deletechat/0');
        expect(response.statusCode).toBe(202);
    });
});
