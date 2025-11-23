const express = require("express");
const requestRouter = express.Router();
const {userAuth} =require("../middlewares/auth");

requestRouter.use("/connectionRequest",userAuth,(req,res)=>{
   try{
        console.log(req.user); 
        res.send(req.user.firstName + "sent you the connection Request");
   }catch(err){
    console.log()
   }
});

module.exports = requestRouter;