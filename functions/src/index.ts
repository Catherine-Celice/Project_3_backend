import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import express from 'express';
import cors from 'cors';
import exampleRoutes from './routes/example';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", exampleRoutes);



export const api = functions.https.onRequest(app);


