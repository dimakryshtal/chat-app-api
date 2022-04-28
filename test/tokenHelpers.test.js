import supertest from 'supertest';
import { app } from '../server/app';
import { connectToDB } from '../server/db/connection';

beforeAll(async () => {
    await connectToDB();
});

describe('JSON Web Tokens', () => {
    const testUser = {
        username: 'jwttest',
        password: '123456',
    };
    const fullUserData = {
        _id: '626aa89694bee40f4518ba2a',
        user_id: 96,
        firstName: 'token',
        lastName: 'tester',
        username: 'jwttest',
        email: 'tt:gmail.com',
        userChats: null,
    };

    let token;
    let refreshToken;

    test('if jwt is valid', async () => {
        const getUser = await supertest(app).post('/login/').send(testUser);
        ({ token, refreshToken } = getUser.body);

        const response = await supertest(app).get('/testAuth').set('Authorization', `Bearer ${token}`);
        expect(response.body).toEqual(fullUserData);
    });

    test('if server refreshes jwt', async () => {
        const expectedObjectKeys = ['user', 'newToken'];

        const response = await supertest(app).post('/refreshToken').set('Authorization', `Bearer ${refreshToken}`);
        expect(Object.keys(response.body)).toEqual(expectedObjectKeys);
    });
});
