import mongoose from 'mongoose';
import mongodb from 'mongodb';
import config from './settings';

export default callback => {
  let db;
  mongoose.Promise = require('bluebird');
  // Connect to the database before starting the application server.
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
