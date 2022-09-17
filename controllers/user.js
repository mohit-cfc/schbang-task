const userModel = require("../schema/users");
const {hashPassword, signToken} = require("../utils");

module.exports = {
  register: async (req, res) => {
    try {
      const {password, email} = req.body;

      const isEmailTaken = await userModel.findOne({email});
      if (isEmailTaken)
        return res.status(400).json({message: "Email already exists"});

      const {salt, hash} = hashPassword(password);

      delete req.body.password;

      userModel.create({...req.body, salt, hash});
      res.status(201).json({
        message: "User registered",
        token: signToken({email: req.body.email}),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  },
  login: async (req, res) => {
    try {
      const {password, email} = req.body;
      console.log(req.body);

      const userData = await userModel.findOne({email});

      if (!userData)
        return res.status(400).json({message: "User is not registered"});

      const hashedPass = hashPassword(password, userData.salt);

      if (hashedPass.hash === userData.hash) {
        //Redirect Checks after login
        return res.status(200).json({
          message: "User logged in",
          token: signToken({email: req.body.email}),
        });
      }
      return res.status(400).json({message: "Incorrect password"});
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  },
};
