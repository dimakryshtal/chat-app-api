import { compare, hashSync } from 'bcrypt';
import { getDb } from '../db/connection.js';
import { getNextSequenceValue } from '../db/getNextId.js';
import { generateAccessToken, generateRefreshToken } from '../helpers/tokenHelpers.js';
import { createNewUser } from '../models/userModel.js';

export const userContoller = {
    getAllUsers: async (req, res) => {
        const db = getDb();
        const usersCollection = db.collection('users');
        try {
            const users = await usersCollection.find({}).toArray();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ result: 'Error', message: err });
        }
    },
    createNewUser: async (req, res) => {
        const db = getDb();
        const {
            firstName, lastName, username, email, password, userChats,
        } = req.body;
        const hashedPassword = hashSync(password, 8);
        const newUser = createNewUser(await getNextSequenceValue('productid'), firstName, lastName, email, hashedPassword, username, userChats);
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
            }, {
                $set: req.body,
            });
            res.status(200).send();
        } catch (err) {
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
            res.status(202).send();
        } catch (err) {
            res.status(400).send();
        }
    },
};
