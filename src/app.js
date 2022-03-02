import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

app.use(router);

app.listen(process.env.PORT);

