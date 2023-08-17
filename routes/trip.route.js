const { TripModel } = require("../models/trip.model");
const ObjectId = require('mongoose').Types.ObjectId;
const tripRouter = require("express").Router();


tripRouter.get("/",async(req,res)=>{
    try {
        let sort = 1;
        let filter ={}
        if(req.query.destination){filter.destination=req.query.destination}
        if(req.query.sort=="desc"){sort=-1}
       
        let data  = await TripModel.find(filter).sort({budgetPerPerson:sort});
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
//post
tripRouter.post("/",validateTrip,async(req,res)=>{
    try {
        let tripExists = await TripModel.findOne(req.body);
        if(tripExists){res.status(409).json("Trip allready exists")}
        else{
            let newTrip = new TripModel(req.body);
            await newTrip.save();
            res.send({message:"trip created successfully",data:newTrip})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

tripRouter.get("/:id",async(req,res)=>{
    try {
        if(!req.params.id || !ObjectId.isValid(req.params.id) ){res.status(422).json({message:"please provide a valid id"})}
        else {
            let data = await TripModel.findById(req.params.id)
            res.send(data)
        }
    } catch (error) {
        console.error(error)
    }
})

tripRouter.delete("/:id",async(req,res)=>{
    try {
        if(!req.params.id || !ObjectId.isValid(req.params.id) ){res.status(422).json({message:"please provide a valid id"})}
        else {
            let tripExists= await TripModel.findById(req.params.id);
            if(!tripExists){res.status(401).json({message:"trip not found with the given id"})}
            else {
                let data = await TripModel.findByIdAndDelete(req.params.id)
                res.send({message:"trip deleted successfully",data})
            }
            
        }
    } catch (error) {
        console.error(error)
    }
})












function validateTrip(req,res,next){
    if(!req.body.name){res.status(401).json({message:"kindly provide your name"})}
    else if(!req.body.email){res.status(401).json({message:"kindly provide your email"})}
    else if(!req.body.password){res.status(401).json({message:"kindly provide your password"})}
    else if(!req.body.destination){res.status(401).json({message:"kindly provide trip destination"})}
    else if(!req.body.noOfTravelers){res.status(401).json({message:"kindly provide no of travelers"})}
    else if(!req.body.budgetPerPerson){res.status(401).json({message:"kindly provide budget per person"})}
    else {next()}
}


module.exports={tripRouter}