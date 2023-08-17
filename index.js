const express = require("express");
const { connection } = require("mongoose");
const app = express();




app.get("/",async(req,res)=>{
    try {
        res.send("home ")
    } catch (error) {
        console.log(error)
    }
})





app.listen(4000,async(req,res)=>{
    try {
        await connection;
        console.log("connected to remote database.")
    } catch (error) {
        console.error(error)
    }
    console.log(`app started running @ http://localhost:4000`)
})