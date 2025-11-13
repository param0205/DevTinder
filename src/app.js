const express = require("express");
const res = require("express/lib/response");

const app = express();


//when we call an express api it goes through all the matching routes untill it sends back the response or times out
// in actual it goes through all the middleware chain before actually reaching to route handlers which sends us back the response
// route handler and middleware can be referred as same depending upon the case


app.use("/middleware",
    [(req, res, next) => {
        console.log("Handling the route handler 1");
        next();
        // res.send("Found the middleware 1");
    },]
)

app.use("/middleware",
    [(req, res, next) => {
        console.log("Handling the route handler 2");
        // next();
        res.send("Found the middleware 12");
    }, (req, res, next) => {
        console.log("Handling the route handler 3");
        next();
        res.send("Found the middleware 2");
    }])

app.listen(8000, () => {
    console.log("Server is connected to Port 8000 successfully");
});