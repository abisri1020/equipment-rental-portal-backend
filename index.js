// const express = require('express');
 import express from "express";
 import { MongoClient} from "mongodb";
 import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT;
// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {const client = new MongoClient(MONGO_URL);await client.connect();console.log("Mongo is connected ✌️😊");return client;}const client = await createConnection();

app.get("/", async function(request,response){
    response.send("🎇Babi Rentals welcomes you!!!🎇 (for items : /items; for different catagory : /items/catagory)");
});

app.get("/items", async function(request,response){
    const items= await client
    .db("BabiRentalItems")
    .collection("items")
    .find({})
    .toArray();
   response.send(items);
});

app.get("/items/:catagory", async function(request,response){
    const {catagory}=request.params;
    // const item=items.filter((i)=>i.catagory===catagory);
    const item= await client
    .db("BabiRentalItems")
    .collection("items")
    .find({"catagory":{"$in":[catagory]}})
    .toArray();
   response.send(item);
});

app.post("/items", async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await client
    .db("BabiRentalItems").collection("items").insertMany(data);
    response.send(result);
});

app.delete("/items/:id", async function(request,response){
    const {id}=request.params;
    const del= await client
    .db("BabiRentalItems")
    .collection("items")
    .deleteOne({id : id});
   response.send(del);
});

app.put("/items/:id", async function(request,response){
    const {id}=request.params;
    const updt=request.body
    const edit= await client
    .db("BabiRentalItems")
    .collection("items")
    .updateOne({id : id},{$set:updt});
   response.send(edit);
});

app.listen(PORT,()=> console.log(`Server is running at port ${PORT}`));