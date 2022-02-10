const bcrypt = require('bcrypt');

const { User } = require('../models/user');


class UserController {
  static async createUser(req, res) {
    try {
      const { name, email, pass, dob } = req.body

      const salt = bcrypt.genSaltSync(10);

      const user = await User.create({
        name: name,
        email: email,
        pass: bcrypt.hashSync(pass, salt),
        salt: salt,
        dob: dob,
      })

      res.json(user);
    } catch (e) {
      return e;
    }
  };

  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      return e;
    }
  };

  static async getOneUser(req, res) {
    try {
      const user = await User.findOne({ id: req.body.id });
      res.json(user);
    } catch (e) {
      return e;
    }
  };

  static async updateUser(req, res) {
    try {
      const { name, email, dob } = req.body

      const user = await User.update({
        name: name,
        email: email,
        dob: dob,
      },
        {
          where: {
            id: req.params.id
          }
        }
      );

      res.json(user)
    } catch (e) {
      return e;
    }
  };

  static async deleteUser(req, res) {
    try {
      const deletrdUser = await User.destroy({
        where: {
          id: req.params.id
        }
      })
      res.json(deletrdUser);
    } catch (e) {
      return e;
    }
  };
};

module.exports = {
  UserController,
};