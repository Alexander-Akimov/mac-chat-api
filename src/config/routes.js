
import user from '../controller/user';
import account from '../controller/account';
import channel from '../controller/channel';
import message from '../controller/message';

export default (app, passport) => {
  //app.use(middleware({ config, db }));

  //api routes v1 (/v1)
  app.use('/v1/user', user());
  app.use('/v1/account', account());
  app.use('/v1/channel', channel());
  app.use('/v1/message', message());

  // Base URL test endpoint to see if API is running
  app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });

};