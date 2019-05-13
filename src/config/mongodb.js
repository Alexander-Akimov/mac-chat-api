import mongoose from 'mongoose';
import mongodb from 'mongodb';
import config from './settings.js';
import bluebird from 'bluebird';

export default (callback) => {
  let db;
  mongoose.Promise = bluebird;
  // Connect to the database before starting the application server.
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(config.mongoUrl, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(config.mongoUrl);
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
    callback(db);
  });
}
