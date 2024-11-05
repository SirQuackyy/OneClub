import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

router.get('/verify/:token', async (req, res) => {
    try {
      const decoded = await jwt.verify(req.params.token, "RANDOM-TOKEN");
      res.send({status: "VALID", id: decoded.userId}).status(200);
    } catch (err) {
      res.send({status: "INVALID"}).status(200);
    }
})

router.post("/", async (req, res) => {
    const saltRounds = 11;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let newUser = {
            schoolID: req.body.schoolID, //String
            name: req.body.name, //String
            email: req.body.email, //String
            password: hash, //>.<
            clubs: req.body.clubs, //Array
            officer: req.body.officer, //Array
        };
        let collection = db.collection("users");
        let result = collection.insertOne(newUser);
        res.send(result).status(204);
    })
});

router.get("/account/:email/:password/:length", async (req, res) => {
    let collection = await db.collection("users");
    let query = {email: `${req.params.email}`};
    let result = await collection.findOne(query);
  
    if(!result){
      res.send({verified: false, reason: "Account Not Found"}).status(404);
    } else {
      bcrypt.compare(req.params.password, result.password, function(err, matches) {
        if(matches){
          const token = jwt.sign(
            {
              userId: result._id,
              userEmail: result.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: `${req.params.length}` }
          );
          res.send({verified: matches, email: result.email, token, name: result.name, schoolID: result.schoolID, clubs: result.clubs, officer: result.officer}).status(200);
        } else {
          res.send({verified: false, reason: "Incorrect Password"}).status(200);
        }
      });
    }
});

router.get("/u/:schoolID", async (req, res) => {
    let collection = await db.collection("users");
    const query = { schoolID: req.params.schoolID };
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.get("/clubs/get/:name", async (req, res) => {
  let collection = await db.collection("clubs");
  const query = { name: req.params.name };
  let result = await collection.findOne(query);

  if(!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.patch("/:schoolID", async (req, res) => {
    let collection = await db.collection("users");
    const query = { schoolID: req.params.schoolID };
    let result = await collection.findOne(query);

    if(!result){
      res.send("Not found").status(404);
    } else {
        const updates =  {
          $set: {
            schoolID: result.schoolID,
            name: result.name,
            email: result.email,
            password: result.password,
            clubs: req.body.clubs,
            officer: req.body.officer,
          }
        };
        let update = collection.updateOne(query, updates);
      
        res.send(update).status(200);
    }
});

router.get("/clubs/all", async (req, res) => {
    let collection = await db.collection("clubs");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.patch("/clubs/:name", async (req, res) => {
    let collection = await db.collection("clubs");
    const query = { name: req.params.name };
    let result = await collection.findOne(query);

    if(!result){
      res.send("Not found").status(404);
    } else {
        const updates =  {
          $set: {
            name: result.name,
            description: result.description,
            events: req.body.events,
            members: req.body.members,
            days: result.days,
            tags: result.tags,
            attendance: req.body.attendance,
          }
        };
        let update = collection.updateOne(query, updates);
      
        res.send(update).status(200);
    }
});

router.post("/clubs/create", async (req, res) => {
        let newClub = {
            name: req.body.name,
            description: req.body.description,
            events: req.body.events,
            members: req.body.members,
            days: req.body.days,
            tags: req.body.tags,
            attendance: req.body.attendance,
        };
        let collection = db.collection("clubs");
        let result = collection.insertOne(newClub);
        res.send(result).status(204);
});

export default router;