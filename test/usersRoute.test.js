import supertest from 'supertest';
import { app } from '../server/app';
import { connectToDB } from '../server/db/connection';

beforeAll(async () => {
    await connectToDB();
});

describe('Test users routes', () => {
    test('if servers sends back array of all users (GET)', async () => {
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('if server is able to execute logging in (POST)', async () => {
        const body = {
            username: 'dima_krshl',
            password: '2508',
        };

        const expectedUser = {
            _id: '626a83d5b8f510544b2a1fda',
            user_id: 29,
            firstName: 'Dima',
            lastName: 'Kryshtal',
            username: 'dima_krshl',
            email: 'dima@gmail.com',
            userChats: null,
        };

        const response = await supertest(app).post('/login/').send(body);
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toEqual(expectedUser);
    });

    test('if server creates a new user (POST)', async () => {
        const body = {
            firstName: 'TestUserName',
            lastName: 'TestUserLastName',
            username: 'testusername',
            email: 'testuser@mail.com',
            password: 'testpassword',
        };

        const response = await supertest(app).post('/register').send(body);
        expect(response.statusCode).toBe(201);
    });

    test('if server updates user data (POST)', async () => {
        const body = {
            email: 'testuseruser@gmail.com',
        };

        const response = await supertest(app).put('/updatedata/testusername').send(body);
        expect(response.statusCode).toBe(200);
    });

    test('if server deletes a particular user (DELETE)', async () => {
        const response = await supertest(app).delete('/delete/testusername');
        expect(response.statusCode).toBe(202);
    });
});
