import express from 'express';
import { userContoller } from '../controllers/usersContoller.js';

export const userRouter = express.Router();

userRouter
    .get('/', userContoller.getUsers)
    .post('/login/', userContoller.getParticularUser)
    .post('/register', userContoller.createNewUser)
    .put('/updatedata/:username', userContoller.updateParticularUser)
    .delete('/delete/:username', userContoller.deleteParticularUser);

// db.listCollections().toArray((err, collections) => {
//     res.send(collections)
// })
