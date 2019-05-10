
import UserController from '../controllers/userController.js';
import AccountController from '../controllers/accountController.js';
import ChannelController from '../controllers/channelController.js';
import MessageController from '../controllers/messageController.js';


import { authenticate, unAuthHandle, generateAccessToken, respond } from '../middlewares/authMiddleware.mjs';



export default (app, passport) => {
  //app.use(middleware({ config, db }));

  //api routes v1 (/v1)
  // app.use('/v1/user', userController());

  //let api = express.Router();
  // '/v1/user/add' - Create

  const userController = new UserController();
  app.post('/v1/user/add', authenticate, userController.add);// '/v1/user/add' - Create  
  app.get('/v1/user', authenticate, userController.get);// '/v1/user/' - Read
  app.get('/v1/user/:id', authenticate, userController.getById);// '/v1/user/:id' - Read 1
  app.get('/v1/user/byEmail/:email', authenticate, userController.getByEmail);// 'v1/user/byEmail/:email'
  app.put('/v1/user/:id', authenticate, userController.updateById);// '/v1/user/:id' - Update
  app.delete('/v1/user/:id', authenticate, userController.deleteById);// '/v1/user/:id' -Delete
  app.delete('/v1/user', authenticate, userController.deleteAll);// '/v1/user/' - Delete all

  const accountController = new AccountController();
  app.post('/v1/account/register', accountController.registr,// '/v1/account/register'
    passport.authenticate('local', { session: false }), accountController.successRegistr);
  app.post('/v1/account/login', accountController.login,// '/v1/account/login'
    passport.authenticate('local', { session: false, scope: [], failWithError: true }),
    unAuthHandle, generateAccessToken, respond);
  app.get('/v1/account/me', authenticate, accountController.me);
  app.get('/v1/account/logout', authenticate, accountController.logout);// '/v1/account/logout'

  const channelController = new ChannelController();
  //app.use('/v1/channel', channel());
  app.post('/add', authenticate, channelController.add); //'/v1/channel/add' - Create
  app.get('/', authenticate, channelController.getAll);// '/v1/channel/' - Read
  app.get('/:id', authenticate, channelController.getById);// '/v1/channel/:id' - Read 1
  app.delete('/:id', authenticate, channelController.deleteById);// '/vq/channel/:id' -Delete

  const messageController = new MessageController();
  app.post('/add', authenticate, messageController.add); // '/v1/message/add' - Create
  app.put('/:id', authenticate, messageController.updateById);// '/v1/message/:id' - Update
  app.get('/byChannel/:channelId', authenticate, messageController.getById);// '/v1/message/byChannel/:channelId'
  app.delete('/:id', authenticate, messageController.deleteById);  // '/vq/message/:id' -Delete
  app.delete('/', authenticate, messageController.deleteAll);// '/v1/message/' - Delete all

  // Base URL test endpoint to see if API is running
  app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });
};