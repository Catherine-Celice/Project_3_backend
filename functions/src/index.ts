import * as functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userDBaccessRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);



export const api = functions.https.onRequest(app);


