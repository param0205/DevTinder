const { status } = require("express/lib/response");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const express = require("express");
const userRouter = express.Router();
const USER_INFO = ["firstName", "lastName", "photoUrl", "gender", "age", "skills", "about"];

userRouter.get("/user/requests/recevied", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            status: "interested",
            toUserId: loggedInUser._id
        }).populate("fromUserId", USER_INFO);

        const data = connectionRequests.map((user) => {
            return user.fromUserId
        })
        res.send({
            message: `Data fetched successfully`,
            data
        });

    } catch (err) {
        res.status(400).send("Error :" + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {
                    status: "accepted",
                    toUserId: loggedInUser._id
                },
                {
                    status: "accepted",
                    fromUserId: loggedInUser._id
                }
            ]

        }).populate("fromUserId", USER_INFO).populate("toUserId",USER_INFO );

        console.log(connectionRequests);

        const data = connectionRequests.map((user) => {
            if(loggedInUser._id.toString() === user.fromUserId._id.toString())
                return user.toUserId;
            return user.fromUserId ;
        })
        res.send({
            message: `Connection requests accepted`,
            data
        });

    } catch (err) {
        res.status(400).send("Error :" + err.message);
    }
})

module.exports = userRouter;