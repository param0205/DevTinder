const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { send } = require("express/lib/response");
const User = require("../models/user");

requestRouter.post("/request/:status/:userId", userAuth, async (req, res) => {
   try {
      console.log("logged in" + req);
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status))
         throw new Error("Invalid Connection Request");

      const toUser = await User.findOne({ _id:toUserId });

      if (!toUser) {
         throw new Error("User not Found");
      }

      const requestAlreadyExist = await ConnectionRequest.findOne({
         $or: [
            {
               fromUserId,
               toUserId
            },
            {
               fromUserId: toUserId,
               toUserId: fromUserId
            }
         ]
      })
      console.log("requestAlreadyExist " + requestAlreadyExist);
      if (requestAlreadyExist) {
         throw new Error("Conection Request already exits");
      }

      const connectionRequestModel = await ConnectionRequest({
         fromUserId,
         toUserId,
         status
      });

      const data  =  await connectionRequestModel.save();

      console.log();
      console.log(req.user);
      res.json({
         message:`${req.user.firstName} is ${status} in  ${toUser.firstName}`,
         // data
      });
   } catch (err) {
      res.status(400).send("Error: " + err)
      console.log("Error: " + err);
   }
});

requestRouter.post("/request/review/:status/:requestId", userAuth , async(req,res) =>{
   try{
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      //validate status
      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
         throw new Error("Invalid connection status request");
      }

      //validate requestId
      const existingRequestId = await ConnectionRequest.findOne({ 
         _id: requestId,
         toUserId : loggedInUser._id,
         status:"interested"
      });
      if(!existingRequestId){
         throw new Error("Connection Request not found");
      }

      //validate fromUserId
      const validfromUserId = await User.findOne({_id : existingRequestId.fromUserId});
      if(!validfromUserId){
         throw new Error("Connection Request from Invalid User");
      }

      existingRequestId.status = status;
      const data = await existingRequestId.save();
      res.json({
         message:`${loggedInUser.firstName} ${status} ${validfromUserId.firstName}'s connection request `,
         data
      })


   }catch(err){
      console.log(err);
      res.status(400).send("Error: " + err.message);
   }
})

module.exports = requestRouter;