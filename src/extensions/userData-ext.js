import mongoose from 'mongoose';
import User from '../models/user.js';

class UserDataExt {

  static findUserByEmail(email, callback) {
    User.findOne({ 'email': email }, (err, userData) => {
      if (err) {
        return callback(err, null);
      } else{
        return callback(null, userData);
      }
    });
  }
}

export default UserDataExt;
