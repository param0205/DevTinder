const adminAuth =  (req, res, next) => {
    const token = "xyz" // req.params.key or token
    try {
        if (token !== "xyz") {
            throw new Error("User is not allowed");
            // res.status(401).send("User is not allowed to make changes")
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.send("user is tired");
    }

}

const userAuth =  (req, res, next) => {
    const token = "user" // req.params.key or token
    try {
        if (token !== "user") {
            throw new Error("User is not allowed");
            // res.status(401).send("User is not allowed to make changes")
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.send("user is tired");
    }

}

module.exports = {
    adminAuth,
    userAuth
}