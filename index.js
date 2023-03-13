const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./utils/db");
const route = require('./routes/route');

connectDB()
    .then(()=>{
        app.listen(5000,()=>console.log('Server is listening on 5000'));
    })
    .catch(err => {
        console.log(err.message);
        console.error('Failed to start server due to database connection failure')
    });


app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({CTS: "Up and running"});
});
app.use('/api',route);

