import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String, default: "",
  email: String, default: "",
  avatarName: String, default: "",
  avatarColor: String, default: ""
});

let User = mongoose.model('User', userSchema);
export default User;

