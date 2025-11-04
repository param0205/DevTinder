const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("you have reached test route");
})

app.use((req,res)=>{
   res.send("Hello from Port 8000");
});

app.listen(8000,()=>{
    console.log("Server is connected to Port 8000 successfully");
});