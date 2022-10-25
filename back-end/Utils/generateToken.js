const json_web_token = require("jsonwebtoken");

const generateToken = (id) => {
  return json_web_token.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
