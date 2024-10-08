const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model")

router.get("/",(req,res)=>{
    res.send("hey");
});
console.log(process.env.NODE_ENV);


if(process.env.NODE_ENV === "development"){
    router.post("/create",async(req,res)=>{
        let owners = await ownerModel.find()
        if(owners.length >0){
            return res
                .status(504)
                .send("You don't have permission to create a new owner");
        }

        let {fullname,email,password} = req.body;

        let craetedOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(craetedOwner);
    });  
}

module.exports = router;
