const express = require("express");

const app = express();

app.get("/ab?c", (req, res) => {
    res.send({ firstname: "Param", lastname: "singh" });
});


app.listen(8000, () => {
    console.log("Server is connected to Port 8000 successfully");
});