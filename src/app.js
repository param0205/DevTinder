const express = require("express");

const app = express();

app.get('/user/:userid/:name/:password', (req, res) => {
    console.log(req.params);
    res.send({ firstname: "Param", lastname: "singh" });
});

app.get("/abc/test", (req, res) => {
    res.send({ firstname: "Paam", lastname: "singh" });
});


app.listen(8000, () => {
    console.log("Server is connected to Port 8000 successfully");
});