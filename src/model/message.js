import mongoose from 'mongoose';
import User from './user.js';
import Channel from './channel.js';

const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = mongoose.Schema({
  messageBody: String, default: "",
  timeStamp: {type: Date, default: Date.now},
  userId: {type: ObjectId, ref: 'User'},
  channelId: {type: ObjectId, ref: 'Channel'},
  userName: String, default: "",
  userAvatar: String, default: "",
  userAvatarColor: String, default: ""
});

let Message = mongoose.model('Message', messageSchema);
export default Message;