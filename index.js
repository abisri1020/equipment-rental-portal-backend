// const express = require('express');
 import express from "express";
 import { MongoClient} from "mongodb";
 import dotenv from "dotenv";
import cors from "cors";
import {itemsRouter} from "./routes/itemscrud.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT;
// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {const client = new MongoClient(MONGO_URL);await client.connect();console.log("Mongo is connected ✌️😊");return client;}export const client = await createConnection();

app.get("/", async function(request,response){
    response.send("🎇Babi Rentals welcomes you!!!🎇 (for items : /items; for different catagory : /items/catagory)");
});

app.use("/items", itemsRouter);

app.listen(PORT,()=> console.log(`Server is running at port ${PORT}`));