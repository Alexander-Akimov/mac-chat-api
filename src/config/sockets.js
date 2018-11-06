import socket from 'socket.io';
import Message from '../model/message';
import Channel from '../model/channel';

export default (app) => {
//!!!!!!!!!app.server must be initialized

  //Listen for connection
  var typingUsers = {};

  let io = socket(app.server);

  io.on('connection', function (client) {
    console.log('a user connected');
    //Listens for a new chat channel
    client.on('newChannel', function (name, description) {
      //Create channel
      let newChannel = new Channel({
        name: name,
        description: description,
      });
      //Save it to database
      newChannel.save(function (err, channel) {
        //Send message to those connected in the room
        console.log('new channel created');
        io.emit("channelCreated", channel.name, channel.description, channel.id);
      });
    });

    //Listens for user typing.
    client.on("startType", function (userName, channelId) {
      console.log("User " + userName + " is writing a message...");
      typingUsers[userName] = channelId;
      io.emit("userTypingUpdate", typingUsers, channelId);
    });

    client.on("stopType", function (userName) {
      console.log("User " + userName + " has stopped writing a message...");
      delete typingUsers[userName];
      io.emit("userTypingUpdate", typingUsers);
    });

    //Listens for a new chat message
    client.on('newMessage', function (messageBody, userId, channelId, userName, userAvatar, userAvatarColor) {
      //Create message

      console.log(messageBody);

      let newMessage = new Message({
        messageBody: messageBody,
        userId: userId,
        channelId: channelId,
        userName: userName,
        userAvatar: userAvatar,
        userAvatarColor: userAvatarColor
      });
      //Save it to database
      newMessage.save(function (err, msg) {
        //Send message to those connected in the room
        console.log('new message sent');

        io.emit("messageCreated", msg.messageBody, msg.userId, msg.channelId, msg.userName, msg.userAvatar, msg.userAvatarColor, msg.id, msg.timeStamp);
      });
    });
  });

  return io; // не знаю зачем этот объект понадобится
}