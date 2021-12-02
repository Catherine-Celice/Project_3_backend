

// require the express module
import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import User from "../models/user";
 
// create a new Router object
const userRoutes = express.Router();
 


userRoutes.post("/users", async (req, res) => {
     const newUser = req.body as User;
     // const newUser = req.body as OptionalId<User>;
     try {
        const client = await getClient();
        // not sure if Project_3 needs to be or should be there
        const result = await client.db("Project_3")
            .collection<User>('users')
            .insertOne(newUser);
        newUser._id = result.insertedId;
        res.status(201).json(newUser);
     } catch (err) {
        console.log("post error");
        res.status(500);
     }
});


userRoutes.get("/users", async (req, res) => {
    const dbquery: any = {};
    try{
        const client = await getClient();
        const results = await client.db("Project_3")
        .collection<User>('users')     // define some interface here 
        .find(dbquery).toArray();
        if(results.length === 0) {
            res.json({message: "no users"})
        }
        res.json(results); // send JSON results
    } catch (err) { 
        console.log("get error");
        res.status(500).json({message: "Internal Server Error"});
    }

});



userRoutes.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const client = await getClient();
        const result = await client.db().collection<User>('users')
        .deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
        } else {
            res.status(204).end();
        }
    } catch (err) { console.log("delete error") }
});





export default userRoutes;


// function async(req: any, res: any): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
//     throw new Error("Function not implemented.");
// }




