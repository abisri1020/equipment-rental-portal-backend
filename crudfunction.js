import { client } from "./index.js";

export async function editItems(id, updt) {
    return await client
        .db("BabiRentalItems")
        .collection("items")
        .updateOne({ id: id }, { $set: updt });
}

export async function deleteItems(id) {
    return await client
        .db("BabiRentalItems")
        .collection("items")
        .deleteOne({ id: id });
}

export async function addItems(data) {
    return await client
        .db("BabiRentalItems").collection("items").insertMany(data);
}

export async function getItemsByCatagory(catagory) {
    return await client
        .db("BabiRentalItems")
        .collection("items")
        .find({ "catagory": { "$in": [catagory] } })
        .toArray();
}

export async function getItems() {
    return await client
        .db("BabiRentalItems")
        .collection("items")
        .find({})
        .toArray();
}

export async function createUser(data) {
    return await client
        .db("BabiRentalItems").collection("users").insertOne(data);
}

export async function loginUser(username) {
    return await client
        .db("BabiRentalItems")
        .collection("users")
        .findOne({username:username})  
}
