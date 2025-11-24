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
         data
      });
   } catch (err) {
      res.send("Error: " + err)
      console.log("Error: " + err);
   }
});

module.exports = requestRouter;