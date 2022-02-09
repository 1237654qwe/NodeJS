const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { secret } = require('../key');

const generateToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "12h" });
}

class AuthController {
  static async signUp(req, res) {
    const candidate = await User.findOne({ where: { email: req.body.email }});

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
  }

  static async signIn(req, res) {
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
  }
};


module.exports = {
  AuthController,
};