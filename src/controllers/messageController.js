import Message from '../models/message.js';

export default function MessageController() {

  this.add = function (req, res) {
    let newMessage = new Message();
    newMessage.messageBody = req.body.messageBody;
    newMessage.userId = req.body.userId;
    newMessage.channelId = req.body.channelId;
    newMessage.userName = req.body.userName;
    newMessage.userAvatar = req.body.userAvatar;
    newMessage.userAvatarColor = req.body.userAvatarColor;

    newMessage.save(err => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Message saved successfully' })
    });
  };

  this.updateById = function (req, res) {
    Message.findById(req.params.id, (err, message) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      message.messageBody = req.body.messageBody;
      message.userId = req.body.userId;
      message.channelId = req.body.channelId;

      /*newMessage.userName = req.body.userName;
      newMessage.userAvatar = req.body.userAvatar;
      newMessage.userAvatarColor = req.body.userAvatarColor;*/

      message.save(err => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Message updated' });
      });
    });
  };

  this.getById = function (req, res) {
    Message
      .find({ 'channelId': req.params.channelId }, (err, messages) => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json(messages);
      });
  };

  this.deleteById = function (req, res) {
    Message.remove({
      _id: req.params.id
    }, (err, message) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Message Successfully Removed' });
    });
  };

  this.deleteAll = function (req, res) {
    Message.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Users All Removed' });
    });
  }
}
