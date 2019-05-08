
import userController  from '../controller/userController.js';
import account from '../controller/accountController.js';
import channel from '../controller/channelController.js';
import message from '../controller/messageController.js';

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