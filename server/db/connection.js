import { MongoClient } from "mongodb";
import { mongoURL } from "../../config/config.js";

const client = new MongoClient(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let dbConnection;

export const connectToDB = () => {
    client.connect((err, db) => {
        if (err) {
            console.error(`Error. ${err}`)
        } else {
            console.log("Server has connected to the mongoDb")
        }
        dbConnection = db.db("chat-app");
    })
}

export const getDb = () => {
    return dbConnection;
}
