import { getDb } from "../db/connection.js";
import { iterateFunc } from "../helpers/helpers.js";

export const userContoller = {
    getAllUsers: async (req, res, next) => {
        let db = getDb();
        let usersCollection = db.collection("Users");
        let users = await usersCollection.find({}).toArray()

        res.status(200).json(users);
    },
    createNewUser: async (req, res, next) => {
        let db = getDb();
        const {firstname, lastname} = req.body;
        try {
            await db.collection("Users").insertOne(req.body)
        } catch(err) {
            res.send({result: "Error", message: err})
            console.error(err)
        }
        res.status(200).json({result: "Success", message: "A new user has been created successfully"})
        
    },
    getParticularUser: async (req, res, next) => {
        let db = getDb();
        let usersCollection = db.collection("Users")
        let fetchedUsers = await usersCollection.find({"_id": Number(req.params.id)}).toArray()
        res.status(200).json(fetchedUsers);

    },
    updateParticularUser: async (req,res, next) => {
        let db = getDb();
        let users = db.collection("Users")
        await users.updateOne({
            "_id": req.params.id
        }, {
            $set: {
                "e-mail": "dima@gmail.com"
            }
        })
        res.status(200).send();
    },
    deleteParticularUser: async (req, res, next) => {
        let db = getDb();
        let users = db.collection("Users");
        await users.deleteOne({
            "_id": Number(req.params.id)
        })
        console.log(req.params.id)
        res.send()
        

    }
}