import express from "express";
import bcrypt from "bcrypt";
import {createUser,loginUser} from "../crudfunction.js";
import jwt from "jsonwebtoken";

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

router.post("/login", async function (request, response) {
    const {username,password} = request.body;
    const userFromDB=await loginUser(username);
    console.log(userFromDB);
    if(!userFromDB){
        response.status(401).send({message:"Invalid credentials"});
    }else{
        const storedPassword=userFromDB.password;
        const isPasswordMatch= await bcrypt.compare(password,storedPassword);
        console.log("isPasswordMatch",isPasswordMatch);
        if(isPasswordMatch){
            const token=jwt.sign({id:userFromDB._id},process.env.KEY);
            response.send({message:"Successfull login", token:token});
        }else{
            response.status(401).send({message:"Invalid credentials"});
        }
    }
});

export const usersRouter=router;