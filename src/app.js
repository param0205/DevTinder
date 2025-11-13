const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();
const { adminAuth, userAuth } = require("./utils/auth");

const user = {firstName: "Param",lastName:"Singh"}


//need of middleware is actually performing repetitive route operation which we are going to use different end
// like reducing the reductancy 
//for eg having to check the authentication of user with diferent admin operation
// like getting the user details, updating , deleting or adding 
// it all require basic permission which the user should have before performing any operation
// hence middleware actually simplies our working
// as we went through many route handlers


app.get("/admin/getuserdata", adminAuth, (req, res) => {
    {
        console.log("getuser data");
        res.send("Send user data");
    }
});

app.delete("/admin/deletedata", adminAuth, (req, res) => {
    {
        console.log("getuser data");
        res.send("delete user data");
    }
});

app.get("/user/getUserdata", userAuth, (req,res)=>{
    console.log("Sent the data");
    res.send(user);
    
})

app.delete("/user/delteUserdata", userAuth, (req, res) => {
    {
        console.log("Deleted User successfully");
        res.send("deleted user data");
    }
});

app.listen(8000, () => {
    console.log("Server is connected to Port 8000 successfully");
});