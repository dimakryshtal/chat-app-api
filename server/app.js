import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUiExpress from 'swagger-ui-express';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { userRouter } from './routes/usersRoute.js';
import { authenticateToken, updateAccessToken } from './helpers/tokenHelpers.js';
import { chatRoomRouter } from './routes/chatRoomRouter.js';
import { messagesRouter } from './routes/messagesRouter.js';

export const app = express();

const doc = yaml.load(readFileSync('openapi.yml', 'utf8'));

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(doc));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.get('/testAuth', authenticateToken(process.env.JWT_SECRET_KEY));
app.post('/refreshToken', updateAccessToken);
app.use(userRouter);
app.use(chatRoomRouter);
app.use(messagesRouter);
