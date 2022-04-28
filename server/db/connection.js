import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

export const connectToDB = () => new Promise((resolve, reject) => {
    client.connect((err, db) => {
        if (err) {
            console.error(`Error. ${err}`);
            reject(err);
        } else {
            console.log('Server has connected to the mongoDb');
            dbConnection = db.db('chat-app');
            resolve();
        }
    });
});

export const getDb = () => dbConnection;
