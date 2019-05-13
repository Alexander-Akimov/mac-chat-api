
import UserController from '../controllers/userController.js';
import AccountController from '../controllers/accountController.js';
import ChannelController from '../controllers/channelController.js';
import MessageController from '../controllers/messageController.js';
import SportsStoreAuthContoller from '../controllers/sportsStoreAuthContoller.js';

import { authenticate, unAuthHandle, generateAccessToken, respond } from '../middlewares/authMiddleware.mjs';
import SportsStoreController from '../controllers/sportsStoreController.js';

export default (api, passport) => {
  //apiRouter.use(middleware({ config, db }));

  //api routes v1 (/v1)
  // apiRouter.use('/v1/user', userController());


  const userController = new UserController();
  api.post('/v1/user/add', authenticate, userController.add);// '/v1/user/add' - Create  
  api.get('/v1/user', authenticate, userController.get);// '/v1/user/' - Read
  api.get('/v1/user/:id', authenticate, userController.getById);// '/v1/user/:id' - Read 1
  api.get('/v1/user/byEmail/:email', authenticate, userController.getByEmail);// 'v1/user/byEmail/:email'
  api.put('/v1/user/:id', authenticate, userController.updateById);// '/v1/user/:id' - Update
  api.delete('/v1/user/:id', authenticate, userController.deleteById);// '/v1/user/:id' -Delete
  api.delete('/v1/user', authenticate, userController.deleteAll);// '/v1/user/' - Delete all

  const accountController = new AccountController();
  api.post('/v1/account/register', accountController.registr,// '/v1/account/register'
    passport.authenticate('local', { session: false }), accountController.successRegistr);
  api.post('/v1/account/login', accountController.login,// '/v1/account/login'
    passport.authenticate('local', { session: false, scope: [], failWithError: true }),
    unAuthHandle, generateAccessToken, respond);
  api.get('/v1/account/me', authenticate, accountController.me);
  api.get('/v1/account/logout', authenticate, accountController.logout);// '/v1/account/logout'

  const channelController = new ChannelController();
  //api.use('/v1/channel', channel());
  api.post('/v1/channel/add', authenticate, channelController.add); //'/v1/channel/add' - Create
  api.get('/v1/channel/', authenticate, channelController.getAll);// '/v1/channel/' - Read
  api.get('/v1/channel/:id', authenticate, channelController.getById);// '/v1/channel/:id' - Read 1
  api.delete('/v1/channel/:id', authenticate, channelController.deleteById);// '/vq/channel/:id' -Delete

  const messageController = new MessageController();
  api.post('/v1/message/add', authenticate, messageController.add); // '/v1/message/add' - Create
  api.put('/v1/message/:id', authenticate, messageController.updateById);// '/v1/message/:id' - Update
  api.get('/v1/message/byChannel/:channelId', authenticate, messageController.getById);// '/v1/message/byChannel/:channelId'
  api.delete('/v1/message/:id', authenticate, messageController.deleteById);  // '/vq/message/:id' -Delete
  api.delete('/v1/message/', authenticate, messageController.deleteAll);// '/v1/message/' - Delete all

  const authContr = new SportsStoreAuthContoller();
  api.post('/account/login', authContr.login);

  const storeController = new SportsStoreController(api);
  api.get('/products', authContr.authenticate, storeController.getAll);
  api.post('/products', authContr.authenticate, storeController.addProduct);
  api.get('/orders', storeController.getAllOrders);
  api.post('/orders', authContr.authenticate, storeController.addOrder);
  api.post('/categories', authContr.authenticate, storeController.addCategory);
  api.get('/categories', storeController.getAllCategories);

  // Base URL test endpoint to see if API is running
  api.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });
};