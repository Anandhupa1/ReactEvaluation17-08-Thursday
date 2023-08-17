const express = require("express");
const { connection } = require("./configs/mongoose.connection");
const { tripRouter } = require("./routes/trip.route");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors())




app.get("/",async(req,res)=>{
    try {
        res.send("Make my trip server ")
    } catch (error) {
        console.log(error)
    }
})

app.use("/trip",tripRouter)



app.listen(4000,async(req,res)=>{
    try {
        await connection;
        console.log("connected to remote database.")
    } catch (error) {
        console.error(error)
    }
    console.log(`app started running @ http://localhost:4000`)
})