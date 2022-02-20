import express from 'express';
import { getDb } from '../db/connection.js';
import { iterateFunc } from '../helpers/helpers.js';
import { userContoller } from '../controllers/users.js';

export const router = express.Router()
 


router
    .get("/", userContoller.getAllUsers)
    .get("/:id", userContoller.getParticularUser)
    .post("/", userContoller.createNewUser)
    .put("/:id", userContoller.updateParticularUser)
    .delete("/:id", userContoller.deleteParticularUser)


    // db.listCollections().toArray((err, collections) => {
    //     res.send(collections)
    // })