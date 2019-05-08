import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String, default: "",
  email: String, default: "",
  avatarName: String, default: "",
  avatarColor: String, default: ""
});

let User = mongoose.model('User', userSchema);
export default User;

