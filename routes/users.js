import express from "express";
import bcrypt from "bcrypt";
import {createUser} from "../crudfunction.js";
const router=express.Router();
async function genPassword(password){
    const salt= await bcrypt.genSalt(10);
    const hashPassward=await bcrypt.hash(password,salt);
    console.log([salt,hashPassward]);
    return hashPassward;
}

router.post("/signup", async function (request, response) {
    const {username,password} = request.body;
    const hashPassward=await genPassword(password);
    const newUser={
        username:username,
        password:hashPassward
    };
    const result = await createUser(newUser);
    response.send(result);
});



export const usersRouter=router;