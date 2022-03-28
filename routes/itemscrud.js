import express from "express";

import { getItems, getItemsByCatagory, addItems, deleteItems, editItems } from "../crudfunction.js";
const router=express.Router();
router.get("/", async function(request,response){
    const items= await getItems();
   response.send(items);
});

router.get("/:catagory", async function(request,response){
    const {catagory}=request.params;
    // const item=items.filter((i)=>i.catagory===catagory);
    const item= await getItemsByCatagory(catagory);
   response.send(item);
});

router.post("/", async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await addItems(data);
    response.send(result);
});

router.delete("/:id", async function(request,response){
    const {id}=request.params;
    const del= await deleteItems(id);
   response.send(del);
});

router.put("/:id", async function(request,response){
    const {id}=request.params;
    const updt=request.body
    const edit= await editItems(id, updt);
   response.send(edit);
});

export const itemsRouter=router;