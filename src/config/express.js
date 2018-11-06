import bodyParser from 'body-parser';
import config from './settings'

export default (app, passport) => {
  //middleware
  //parse application/json
  app.use(bodyParser.json({
    limit: config.bodyLimit
  }));

  //passport config
  app.use(passport.initialize());

}