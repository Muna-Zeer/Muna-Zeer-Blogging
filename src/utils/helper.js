const crypto = require("crypto");


const generateKey = () => {
    return crypto.randomBytes(64).toString("hex");
  };
  
  module.exports = {
    generateKey
  };