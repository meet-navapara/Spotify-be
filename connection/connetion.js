const mongoose= require("mongoose")

const dbconnection =async (connectionString)=>{
         await mongoose.connect(connectionString)
         console.log("database connected")
}

module.exports={dbconnection}