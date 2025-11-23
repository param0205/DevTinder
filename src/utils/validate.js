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
const validateFieldUpdate = (data) => {
    const Allowed_Field_Update = [
        "firstName",
        "lastName",
        "email",
        "photoUrl",
        "age",
        "gender",
        "skills",
        "about"];
    const update_allowed_flag = Object.keys(data).every((fields) =>
        Allowed_Field_Update.includes(fields)
    );
    return update_allowed_flag;
}

const skillsValidate = (data) =>{
    if(data.skills.length > 10)
        return false;
    return true;
}

const validatePassword = (password) =>{
    if(!validator.isStrongPassword(password))
        throw new Error("Please Enter Strong Password")
}


module.exports = {
    validateSignUp,
    validateFieldUpdate,
    skillsValidate,
    validatePassword
};