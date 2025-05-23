const mongoose= require("mongoose")

const connection =async (connectionString)=>{
         await mongoose.connect(connectionString)
         console.log("database connected")
}

module.exports=connection