const express = require("express");
const res = require("express/lib/response");

const app = express();


app.use("/middleware", (req, res, next) => {
    console.log("Handling the route handler 1");
    next();
    res.send("Found thr middleware 1");
}, (req, res,next) => {
    console.log("Handling the route handler 2");
    // res.send("found the middleware 2");
    next();
},(req, res,next) => {
    console.log("Handling the route handler 3");
    // res.send("found the middleware 3");
    next();
}
)

app.get('/user/:userid/:name/:password', (req, res) => {
    console.log(req.params);
    res.send({ firstname: "Param", lastname: "singh" });
});

app.get("/abc", (req, res) => {
    res.send({ firstname: "Paam", lastname: "singh" });
});


app.listen(8000, () => {
    console.log("Server is connected to Port 8000 successfully");
});