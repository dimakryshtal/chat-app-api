import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/users.js';
import { port } from '../config/config.js';
import { connectToDB, getDb } from './db/connection.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())
app.use(morgan("dev"))

app.listen(port, () => {
    console.log("Server started on port 8080");
    connectToDB()
})

app.use("/user", router)