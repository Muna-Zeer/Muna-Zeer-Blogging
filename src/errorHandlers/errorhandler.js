// const { validator } = require("sequelize/types/utils/validator-extras");
const validate=require("validate");
const validator=require("validator");

//Validate an Email format
const validateEmail=(email)=>{
    return validator.isEmail(email);
}

// Validate Password 
const validatePassword=(password)=>{
    //Use regular  expression to validate the password
const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

const validateUserName=(username)=>{
return username.length>0 && username.length<=15;
}

module.exports={validateEmail,validatePassword,validateUserName}