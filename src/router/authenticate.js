// import ValidationError from "../utils/validateError.js";
const express = require("express");
const ValidationError = require("../utils/validateError");
const authRouter = express.Router();
const { validateSignUp, validatePassword } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res) => {

    console.log(req.body);
    try {
        validateSignUp(req.body);
        const { firstName, lastName, email, password, age } = req.body;
        const encrpt_password = await bcrypt.hash(password, 10);
        console.log(encrpt_password);

        const userObj = await User({
            firstName,
            lastName,
            email,
            password: encrpt_password,
            age,
        });
        await userObj.save();
        res.send(userObj);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error Saving the data " + err.message);
        console.log("Welcome to Home Page");
    }
});

authRouter.post("/login", async (req, res, next) => {

    console.log(req.body);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new ValidationError("email", "Invalid email");
        } else {
            const password_flag = await user.passwordCheck(password)
            console.log(password_flag);
            if (!password_flag) {
                throw new ValidationError("password", "Incorrect Password!!");
            } else {
                const token = await user.jwtToken();
                res.cookie("token", token);
                res.send({
                    message: "Login Successfull !!",
                    data: user
                });
            }
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

authRouter.patch("/updatePassword", async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log("EMail: " + email);
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Email credentials");
        }
        console.log(user);
        validatePassword(password)
        user.password = await bcrypt.hash(password, 10);
        user.save();
        res.json(`${user.firstName}, your password updated Successfuuly`);
    } catch (err) {
        // console.log(err);
        res.status(400).send("Error : " + err.message);
    }
});

module.exports = authRouter;
