const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { generateToken } = require('../utils/generateToken')

class AuthController {
  static async signUp(req, res) {
    try {
      const candidate = await User.findOne({ where: { email: req.body.email } });

      if (candidate) {
        res.status(409).json({
          message: "This email is exist."
        });
      } else {
        const salt = bcrypt.genSaltSync(10)
        const pass = req.body.pass

        const user = new User({
          name: req.body.name,
          email: req.body.email,
          pass: bcrypt.hashSync(pass, salt),
          salt: salt,
          dob: req.body.dob,
        })

        const token = generateToken(user._id);

        await user.save();
        res.status(201).json({ token });
      }

    } catch (e) {
      return e;
    }
  }


  static async signIn(req, res) {
    try {
      const candidate = await User.findOne({ email: req.body.email });

      if (candidate) {
        const hashPass = bcrypt.hashSync(req.body.pass, candidate.salt);
        const passResult = hashPass === candidate.pass

        if (passResult) {
          const token = generateToken(candidate._id);
          return res.json({ token });

        } else {
          res.status(401).json({
            message: "Passwords do not match"
          });
        }
      } else {
        res.status(404).json({
          message: "User not found"
        });
      }
    } catch (e) {
      return e;
    }
  }
};


module.exports = {
  AuthController,
};