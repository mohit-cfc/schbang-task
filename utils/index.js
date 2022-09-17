const crypto = require("crypto");
const {verify} = require("jsonwebtoken");
const {sign} = require("jsonwebtoken");

module.exports = {
  hashPassword: (password, salt = null) => {
    if (salt === null) salt = crypto.randomBytes(16).toString("hex");

    let hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return {salt, hash};
  },
  signToken: (data) => {
    return sign(data, process.env.JWT_SECRET);
  },
  verifyToken: (authHeader) => {
    try {
      const token = authHeader.split(" ")[1];
      return verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return false;
    }
  },
};
