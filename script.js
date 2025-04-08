const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
  userID: "abc123",
  role: "admin"
};

const secret = process.env.JWT_SECRET

const encrypt = (payload, secret) => {
  // your code here and return token
  const token = jwt.sign(payload, secret, { expiresIn:'1h' });
  return token;
};

module.exports = encrypt;

const token = encrypt(payload, secret);
console.log('Token with expiry: ', token);


setTimeout(() => {
  try {
    const decoded = jwt.verify(token, secret);
    console.log("✅ Token is valid. Decoded payload:", decoded);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("⛔ Token has expired.");
    } else {
      console.log("⛔ Invalid token:", error.message);
    }
  }
}, 6000);