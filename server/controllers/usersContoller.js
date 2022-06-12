import { compare, hashSync } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/connection.js';
import { getNextSequenceValue } from '../db/getNextId.js';
import { generateAccessToken, generateRefreshToken } from '../helpers/tokenHelpers.js';
import { createNewUser } from '../models/userModel.js';

export const userContoller = {
    getUsers: async (req, res, next) => {
        const db = getDb();
        const usersCollection = db.collection('users');
        const { query } = req;

        let body;

        if (query.searchval) {
            body = { username: { $regex: new RegExp(query.searchval, 'i') } };
        } else if (query.searchid) {
            const id = new ObjectId(query.searchid);
            body = { _id: id };
        } else if (query.searchids) {
            const user_ids = query.searchids.split(',').map((x) => new ObjectId(x));
            body = { _id: { $in: user_ids } };
        } else {
            res.status(400).json({ result: 'Error', message: 'Invalid query' });
            next();
        }

        try {
            const users = await usersCollection.find(body).project({
                username: 1,
                firstName: 1,
                lastName: 1,
                _id: 1,
            }).limit(15).toArray();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ result: 'Error', message: err });
        }
    },
    createNewUser: async (req, res) => {
        const db = getDb();
        const {
            firstName, lastName, username, email, password, userChats, userFriends,
        } = req.body;

        const hashedPassword = hashSync(password, 8);
        const newUser = createNewUser(firstName, lastName, email, hashedPassword, username, userChats, userFriends);
        try {
            await db.collection('users').insertOne(newUser);
            res.status(201).json({ result: 'Success', message: 'A new user has been created successfully' });
        } catch (err) {
            res.status(400).json({ result: 'Error', message: err });
        }
    },
    // For authenticaition
    getParticularUser: async (req, res) => {
        const db = getDb();
        const usersCollection = db.collection('users');
        const {
            username,
            password,
        } = req.body;

        const user = await usersCollection.findOne({ username });
        if (user && await compare(password, user.password)) {
            delete user.password;
            const token = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.status(200).json({
                user,
                token,
                refreshToken,
            });
        } else {
            res.status(401).send("Error. User doesn't exist.");
            // res.status(200).json(fetched);
        }
    },
    updateParticularUser: async (req, res) => {
        const db = getDb();
        const users = db.collection('users');
        try {
            await users.updateOne({
                username: req.params.username,
            }, req.body);
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(400).send();
        }
    },
    deleteParticularUser: async (req, res) => {
        const db = getDb();
        const users = db.collection('users');
        try {
            await users.deleteOne({
                username: req.params.username,
            });
            res.status(202).json({ result: 'Success', message: 'A user has been deleted successfully' });
        } catch (err) {
            res.status(400).send();
        }
    },
};
