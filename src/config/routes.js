
import userController  from '../controllers/userController.js';
import account from '../controllers/accountController.js.js';
import channel from '../controllers/channelController.js';
import message from '../controllers/messageController.js';

export default (app, passport) => {
  //app.use(middleware({ config, db }));

  //api routes v1 (/v1)
  app.use('/v1/user', userController());
  app.use('/v1/account', account());
  app.use('/v1/channel', channel());
  app.use('/v1/message', message());

  // Base URL test endpoint to see if API is running
  app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });

};