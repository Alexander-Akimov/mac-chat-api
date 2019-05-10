import Account from '../models/account.js';
import User from '../models/user.js';

export default function AccountController() {

  this.registr = function (req, res, next) {
    var query = User.findOne({ 'email': req.body.email });
    //var promise = query.exec();

    //console.log(typeof(promise.prototype));
    // assert.ok(promise instanceof Promise);

    query.then((userData) => {
      if (userData != null) {
        console.log(`userData: ${userData}`);
        res.status(300).json({ message: `Email ${req.body.email} is already registered` });
      }
      else {
        Account.register(new Account({ username: req.body.email }), req.body.password, function (err, account) {
          if (err) {
            res.status(500).json({ message: err });
          } else {
            next();
          }
        });
      }
    }).catch((err) => {
      console.log(`error: ${err}`);
      res.status(409).json({ message: `An error occured: ${err.message}` });
    });
  };

  this.successRegistr = function (req, res) {
    res.status(200).json({ message: 'Successfully created new account' });
  };

  this.login = function (req, res, next) {
    User.findOne({ 'email': req.body.email })
      .then(() => { next(); })
      .catch((err) => {
        res.status(409).json({ message: `An error occured: ${err.message}` });
      });
  };

  this.logout = function (req, res) {
    res.logout();
    res.status(200).send('Successfully logged out');
  };

  this.me = function (req, res) {
    res.status(200).json(req.user);
  };
}
