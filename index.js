const express = require("express");
const connection = require("./connection/connetion");
var cors = require('cors')
const userRoutes = require("./routes/user.route");
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
    await connection(process.env.URL)

}
connect()

