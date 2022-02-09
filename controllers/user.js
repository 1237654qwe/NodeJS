const bcrypt = require('bcrypt');

const { User } = require('../models/user');


class UserController {
  static async createUser(req, res) {
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
  };



  static async getUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
  };

  static async getOneUser(req, res) {
    const user = await User.findOne({ id: req.body.id });
    res.json(user);
  };

  static async updateUser(req, res) {
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
  };

  static async deleteUser(req, res) {
    const deletrdUser = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletrdUser);
  };
};

module.exports = {
  UserController,
};