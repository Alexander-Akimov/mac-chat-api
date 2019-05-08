import mongoose from 'mongoose';

const channelSchema = mongoose.Schema({
  name: String, default: "",
  description: String, default: ""
});

let Channel = mongoose.model('Channel', channelSchema);

export default Channel;
