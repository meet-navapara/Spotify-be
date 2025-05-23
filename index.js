const express = require("express");
var cors = require('cors')
const userRoutes = require("./routes/user.route");
const {dbconnection} = require("./connection/connetion")
const trackRoutes = require('./routes/track.route');
require('dotenv').config();
const app = express()
app.use(cors());
app.use(express.json())


app.use('/api/users', userRoutes);
app.use('/api', trackRoutes);

const connect = async ()=>{
     app.listen(process.env.PORT,()=>{
            console.log("Server is running");
    })
    mongoose.connect(process.env.URL)
    console.log("database connected")

}
connect()

