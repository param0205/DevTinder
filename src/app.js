const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authenticate");
const profileRourter = require("./router/userProfile");
const requestRouter = require("./router/request");
const userRouter = require("./router/userRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRourter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(() => {
    console.log("DataBase connection established");
    app.listen(8000, () => {
        console.log("Server is connected to Port 8000 successfully");
    });
}).catch(() => {
    console.log("DataBase conection failed");
});
