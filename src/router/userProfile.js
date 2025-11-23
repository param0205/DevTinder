const express = require("express")
const profileRourter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateFieldUpdate, skillsValidate } = require("../utils/validate");
const User = require("../models/user");



profileRourter.get("/profile/view", userAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error : " + err.message);
        console.log("Welcome to Home Page");
    }
});

profileRourter.patch("/profile/edit", userAuth, async (req, res) => {
    const userId = req.params?.userId;
    console.log(userId);
    const data = req.body;
    try {
        if (!validateFieldUpdate(data)) {
            throw new Error("Invalid update request");
        }
        if (!skillsValidate(data)) {
            throw new Error("Max 10 skills are allowed");
        }
        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(data).forEach(key => (loggedInUser[key] = data[key]));
        loggedInUser.save();
        console.log(loggedInUser);
        // const user = await User.findByIdAndUpdate(loggedInUser._id, data, { returnDocument: 'After', runValidators: true });
        res.json({message:`${loggedInUser.firstName}, you profile update successully`,
            data:loggedInUser});
    } catch (err) {
        res.status(400).send("Error updating the data " + err.message);
    }
});

module.exports = profileRourter;