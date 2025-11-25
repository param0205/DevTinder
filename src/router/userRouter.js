const { status } = require("express/lib/response");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const express = require("express");
const userRouter = express.Router();
const USER_INFO = ["firstName", "lastName", "photoUrl", "gender", "age", "skills", "about"];
const User = require("../models/user");


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

        }).populate("fromUserId", USER_INFO).populate("toUserId", USER_INFO);

        console.log(connectionRequests);

        const data = connectionRequests.map((user) => {
            if (loggedInUser._id.toString() === user.fromUserId._id.toString())
                return user.toUserId;
            return user.fromUserId;
        })
        res.send({
            message: `Connection requests accepted`,
            data
        });

    } catch (err) {
        res.status(400).send("Error :" + err.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;    
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id
                },
                {
                    fromUserId: loggedInUser._id
                }
            ]
        }).select("fromUserId toUserId")

        console.log(connectionRequests);

        const data = connectionRequests.map((user) => {
            if (loggedInUser._id.toString() === user.fromUserId._id.toString())
                return user.toUserId;
            return user.fromUserId;
        });

        const userFeed = await User.find({
            $and: [
                { _id: { $nin: Array.from(data) } },
                {_id: { $ne: loggedInUser._id }}
            ]
        }).select(USER_INFO)
        .skip(skip)
        .limit(limit);

        res.send({
            message: `User Data feed fetched Successfully`,
            userFeed
        });

    } catch (err) {
        res.status(400).send("Error :" + err.message);
    }
})

module.exports = userRouter;