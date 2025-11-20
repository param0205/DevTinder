const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { threadId } = require("worker_threads");
const app = express();
const { validateSignUp } = require("./utils/validate");
const bcrypt = require("bcrypt");
const { hash } = require("crypto");

// const { adminAuth, userAuth } = require("./utils/auth");

app.use(express.json());

app.get("/user", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user.length === 0) {
            res.status(401).send("User Not Found " + err.message)
        } else {
            res.send(user);
        }
        res.send(user);
    } catch (err) {
        res.status(401).send("Something went wrong!!" + err.message);
    }
});

app.get("/feed", async (req, res) => {
    try {
        const user = await User.find();
        if (user.length === 0) {
            res.status(401).send("User Not Found " + err.message)
        } else {
            res.send(user);
        }
        res.send(user);
    } catch (err) {
        res.status(401).send("Something went wrong!!" + err.message);
    }
});

app.post("/signUp", async (req, res) => {

    console.log(req.body);
    try {
        validateSignUp(req.body);
        const {firstName, lastName, email, password, age} = req.body;
        const encrpt_password = await bcrypt.hash(password,10);
        console.log(encrpt_password);

       const userObj = await User({
          firstName,
          lastName,
          email,
          password:encrpt_password,
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

app.post("/login", async (req, res) => {

    console.log(req.body);
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email});

        if(!user){
            throw new Error("User doesn't exist");
        }else{
            const password_flag = await bcrypt.compare(password, user.password)
            if(!password_flag){
                throw new Error("Incorrect Password!!")
            }else{
                res.send("Login Successfull !!");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Error : " + err.message);
        console.log("Welcome to Home Page");
    }
});

app.delete("/user", async (req, res) => {

    console.log(req.body.userId);
    try {
        await User.findByIdAndDelete(req.body.userId);
        res.send("User deleted Successfully");
    } catch (err) {
        res.status(400).send("Error deleting the data " + err.message);
        console.log("Welcome to Home Page");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    console.log(userId);
    const data = req.body;
    try {
        const Allowed_Field_Update = ["photoUrl", "age", "gender", "skills", "about"];
        const update_allowed_flag = Object.keys(data).every((fields) =>
            Allowed_Field_Update.includes(fields)
        );
        if (!update_allowed_flag) {
            throw new Error("Update not allowed");
        }
        if (data?.skills?.length > 10) {
            throw new Error("Max 10 skills are allowed");
        }
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: 'before', runValidators: true });
        res.send(user);
    } catch (err) {
        res.status(400).send("Error updating the data " + err.message);
    }
});

// app.use("/", (req, res) => {
//     res.send("Welcome to Home Page");
//     console.log("Welcome to Home Page");
// });

connectDB().then(() => {
    console.log("DataBase connection established");
    app.listen(8000, () => {
        console.log("Server is connected to Port 8000 successfully");
    });
}).catch(() => {
    console.log("DataBase conection failed");
});
