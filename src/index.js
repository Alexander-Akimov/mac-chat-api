import configExpress from './config/express';
import configPassport from './config/passport';
import configSockets from './config/sockets';
import configMongoDb from './config/mongodb';
import configRouting from './config/routes';
import settings from './config/settings';
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

module.exports = { // For what puporse????
  app,
  io
}
