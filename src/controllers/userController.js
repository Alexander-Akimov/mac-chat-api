import User from '../models/user.js';

export default function UserController() {

  this.add = function (req, res) {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.avatarName = req.body.avatarName;
    newUser.avatarColor = req.body.avatarColor;

    newUser.save(err => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(newUser);
    });
  };
  
  this.get = function (req, res) {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(users);
    });
  };

  this.getById = function (req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(user);
    });
  };

  this.updateById = function (req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.avatarName = req.body.avatarName;
      user.avatarColor = req.body.avatarColor;
      user.save(err => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'User info updated' });
      });
    });
  };

  this.getByEmail = function (req, res) {
    User.findOne({ 'email': req.params.email })
      .exec((err, userData) => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json(userData);
      });
  };

  this.deleteById = function (req, res) {
    User.remove({
      _id: req.params.id
    }, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'User Successfully Removed' });
    });
  };

  this.deleteAll = function (req, res) {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Users All Removed' });
    });
  };
}
