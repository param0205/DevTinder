const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth =  async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log(req.cookies);
        if (!token) {
            throw new Error("Invalid token !! : Kindly login")
        } else {
            const { _id } = jwt.verify(token, "PRIVATEKEY@123");
            const user = await User.findById(_id);
            if (!user) { throw new Error("Invalid User creditenials") }
            else {
                req.user = user
                next();
            }
        }

    } catch (err) {
        console.log(err);
        res.send("Error1 :" + err.message);
    }

}

module.exports = {
    userAuth
}