const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authenticate");
const profileRourter = require("./router/userProfile");
const requestRouter = require("./router/request");
const userRouter = require("./router/userRouter");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/log",(req, res) => {
    try {
        res.clearCookie(
            "token", null,
            {
                expires: new Date(Date.now())
            });
        res.send("Logged out Successfully");
    } catch (err) {
        res.send("Error:" + err.message);
        console.log(err);
    }
});

app.use("/", authRouter);
app.use("/", profileRourter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.use(errorHandler);



connectDB().then(() => {
    console.log("DataBase connection established");
    app.listen(8000, () => {
        console.log("Server is connected to Port 8000 successfully");
    });
}).catch(() => {
    console.log("DataBase conection failed");
});
