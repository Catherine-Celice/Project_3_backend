// require the express module
import express from "express";

import { getClient } from "../db";
import User from "../models/user";

import { ObjectId, OptionalId  } from "mongodb";  // for testing purposes only
//import { OptionalId  } from "mongodb";  // for production
//import { ObjectId } from "mongodb"; // for testing purposes only
// create a new Router object
const userRoutes = express.Router();
 
// Functions for use in our application
// functions for our personal use during development appear after these

// tested and it works
userRoutes.post("/users", async (req, res) => {
     //const newUser = req.body as User;
     const newUser = req.body as OptionalId<User>;
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

// tested and it works
// to get a listing of all users
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

  // tested and it works
  // This function is the one we will use to get a single registered user.
  userRoutes.get("/user/:mail/:password1", async (req, res) => {
    const m = req.params.mail;
    const pwd = req.params.password1;
    try {
      const client = await getClient();
      const user = await client.db("Project_3").collection<User>('users').findOne({ email : m, password1: pwd });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({message: "Not Found"});
      }
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });


// tested and works -- this is how we should delete users - by email and password combo
userRoutes.delete("/deleteuser/:mail/:password1", async (req, res) => {
    const m = req.params.mail;
    const pwd = req.params.password1;
    try {
        const client = await getClient();
        const result = await client.db("Project_3").collection<User>('users')
        .deleteOne({ email: m, password1: pwd});
        if (result.deletedCount === 0) {
        } else {
            res.status(204).end();
        }
    } catch (err) { console.log("delete error") }
});

// test this
//to make changes to any part of the user profile
  userRoutes.put("/editprofile/:mail/:password1", async (req, res) => {
    
    const m = req.params.mail;
    const pwd = req.params.password1;

    try {
        const client = await getClient();
        const user = req.body as OptionalId<User>;
        const results = await client.db("Project_3").collection<User>('users')
        .replaceOne({email: m, password1: pwd}, user);
        if(results.modifiedCount === 0 ) {
            res.status(404)
          }
          else {
            res.send(200);
          }
     
    } catch (err) { 
        console.log("basic put (alter) did not work");
        res.status(500);
    }
});




// code for dealing with the pets
// to add a pet
userRoutes.put("/addpet/:mail/:password1", async (req, res) => {
    
  const m = req.params.mail;
  const pwd = req.params.password1;
  const pet = req.query.petList as string;

  try {
      const client = await getClient();
      const results = await client.db("Project_3").collection<User>('users')
      .updateOne({email: m, password1: pwd},{ $push: {petList: pet}});
      if(results.modifiedCount === 0 ) {
          res.status(404)
        }
        else {
          res.send(200);
        }
   
  } catch (err) { 
      console.log("add a pet did not work");
      res.status(500);
  }
});


// to delete a pet
userRoutes.put("/removepet/:mail/:password1", async (req, res) => {
    
  const m = req.params.mail;
  const pwd = req.params.password1;
  const pet = req.query.id as string;

  try {
      const client = await getClient();
      const results = await client.db("Project_3").collection<User>('users')
      .updateOne({email: m, password1: pwd},{ $pull: {petList: pet}});
      if(results.modifiedCount === 0 ) {
          res.status(404)
        }
        else {
          res.send(200);
        }
   
  } catch (err) { 
      console.log("add a pet did not work");
      res.status(500);
  }
});


// test this -----
// to change things in user profile other than pets
userRoutes.put("/users/:mail/:password1", async (req, res) => {
    
  const m = req.params.mail;
  const pwd = req.params.password1;

  try {
      const client = await getClient();
      const user = req.body as OptionalId<User>;
      const results = await client.db("Project_3").collection<User>('users')
      .replaceOne({email: m, password1: pwd}, user);
      if(results.modifiedCount === 0 ) {
          res.status(404)
        }
        else {
          res.send(200);
        }
   
  } catch (err) { 
      console.log("delete a pet did not work");
      res.status(500);
  }
});




//tester code - keep this just in case the finished functions above do not work
// userRoutes.put("/editprofile/:mail/:password1", async (req, res) => {
    
//     const first = req.params.firstname;
//     try {
//         const client = await getClient();
//         const user = req.body as OptionalId<User>;
//         const results = await client.db("Project_3").collection<User>('users')
//         .replaceOne({firstname: first}, user);
//         if(results.modifiedCount === 0 ) {
//             res.status(404)
//           }
//           else {
//             res.send(200);
//           }
     
//     } catch (err) { 
//         console.log("");
//         res.status(500);
//     }
// });




// Functions for use by us during development; not to be used in the production version of the frontend.


// For testing and cleaning the database
userRoutes.get("/getbyfirstname/:firstname", async (req, res) => {
  const first = req.params.firstname;
  try {
    const client = await getClient();
    const user = await client.db("Project_3").collection<User>('users').findOne({ firstname : first });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: "Not Found"});
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// // for testing and cleaning the user database
userRoutes.get("/getbyemail/:email", async (req, res) => {
  const mail = req.params.email;
  try {
    const client = await getClient();
    const user = await client.db("Project_3").collection<User>('users').findOne({ email : mail });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: "Not Found"});
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// For cleaning and testing database
userRoutes.delete("/deletebyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const client = await getClient();
      const result = await client.db("Project_3").collection<User>('users')
      .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
      } else {
          res.status(204).end();
      }
  } catch (err) { console.log("delete error") }
});


export default userRoutes;




