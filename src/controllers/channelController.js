import Channel from '../models/channel.js';

export default function ChannelController() {

  this.add = function (req, res) {
    let newChannel = new Channel();
    newChannel.name = req.body.name;
    newChannel.description = req.body.description;

    newChannel.save(err => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Channel saved successfully' })
    });
  };

  this.getAll = function (req, res) {
    Channel.find({}, (err, channels) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(channels);
    });
  };

  this.getById = function (req, res) {
    Channel.findById(req.params.id, (err, channel) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(channel);
    });
  };

  this.deleteById = function (req, res) {
    User.remove({
      _id: req.params.id
    }, (err, channel) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Channel Successfully Removed' });
    });
  };
}
