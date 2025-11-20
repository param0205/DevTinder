const validator = require("validator");

const validateSignUp = (data) => {
    const { firstName, lastName, email, password } = data;
    if (!firstName || !lastName)
        throw new Error("Name is not valid");
    else if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please Enter a Strong password");
    }

}

module.exports = { validateSignUp };