const express = require("express");

const app = express();

app.use("/user", (req, res) => {
    res.send("you have reached test route");
});

app.get("/user", (req, res) => {
    res.send({ firstname: "Param", lastname: "singh" });
});

app.post("/user", (req, res) => {
    res.send("Data saved successfully yo post call");
});

app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
});


// this will match all the http methods of api calls to /test
app.use("/test", (req, res) => {
    res.send("you have reached test route");
});


app.listen(8000, () => {
    console.log("Server is connected to Port 8000 successfully");
});