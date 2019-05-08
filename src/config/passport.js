import passportlocal from 'passport-local';

import Account from '../model/account.js';

export default (passport) => {
  passport.use(new passportlocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    Account.authenticate()
  ));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
}