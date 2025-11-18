const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

// const { adminAuth, userAuth } = require("./utils/auth");

app.use(express.json());

app.get("/user", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user.length === 0) {
            res.status(401).send("User Not Found " + err.message)
        }else{
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
        }else{
            res.send(user);
        }
        res.send(user);
    } catch (err) {
        res.status(401).send("Something went wrong!!" + err.message);
    }
});

app.post("/signUp", async (req, res) => {

    console.log(req.body);
    const userObj = new User(req.body);
    try {
        await userObj.save();
        res.send(userObj);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error Saving the data " + err.message);
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

app.patch("/user", async (req, res) => {
    console.log(req.body.userId);
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.body.userId, data, {returnDocument : 'before', runValidators: true});
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
