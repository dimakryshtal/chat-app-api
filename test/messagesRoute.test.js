import supertest from 'supertest';
import { app } from '../server/app';
import { connectToDB } from '../server/db/connection';

beforeAll(async () => {
    await connectToDB();
});

describe('Test messages route', () => {
    test('if server find messaged of the particular room (GET)', async () => {
        const expectedResult = ['test message 1', 'test message 2', 'test message 3', 'test message 4', 'test message 5', 'test message 6'];

        const response = await supertest(app).get('/messagesfrom/1');

        const plainMessages = response.body.messages.map(({ message }) => message);

        expect(plainMessages).toEqual(expectedResult);
    });
});
