const express = require("express");
const app = express();
const path=require("path")
const port =process.env.port||5000;
const cors=require("cors");
const data=require('./data.js');
const jwt=require("jsonwebtoken");
const Jwt_secret="faslejkhtutbjgbj" ;
app.use(cors());
require('./models/post');
const mongoose=require("mongoose");
require('./models/model');
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
mongoose.connect("mongodb+srv://Kingley23:Prakash123@cluster0.kd9lupf.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on("connected",()=>{
    console.log("sucessfully connected to mongo db");
})

//serving the build
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

mongoose.connection.on("error",()=>{
    console.log("not coonnected to mongodb");
})

app.listen(port,()=>{
    console.log("server is running on" + port)
});