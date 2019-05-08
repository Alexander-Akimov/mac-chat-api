import configExpress from './config/express.js';
import configPassport from './config/passport.js';
import configSockets from './config/sockets.js';
import configMongoDb from './config/mongodb.js';
import configRouting from './config/routes.js';
import settings from './config/settings.js';
import http from 'http';
import express from 'express';
import passport from 'passport';

const app = express();
app.server = http.createServer(app);

configExpress(app, passport);

configPassport(passport);

//connect to db
configMongoDb(db => {
  //internal middleware
});

configRouting(app, passport);

const io = configSockets(app);

app.server.listen(settings.port);
console.log(`Started on port ${app.server.address().port}`);

export  { // For what puporse????
  app,
  io
}
