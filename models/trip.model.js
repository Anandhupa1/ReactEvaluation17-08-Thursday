const mongoose = require("mongoose");
const tripSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    destination:{type:String,required:true},
    noOfTravelers:{type:Number,default:0},
    budgetPerPerson:{type:Number,required:true}
})

const TripModel = mongoose.model("trip",tripSchema);

module.exports={TripModel}