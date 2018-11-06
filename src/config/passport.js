import { Strategy as LocalStrategy } from 'passport-local';
import Account from '../model/account';

export default (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    Account.authenticate()
  ));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
}