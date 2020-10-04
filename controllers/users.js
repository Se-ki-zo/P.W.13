const User = require('../models/user.js');

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => res.status(400).send({
      message: err,
    }));
};

module.exports.returnUsers = (req, res) => {
  User.find(req.params)
    .then((user) => res.send({
      data: user,
    }))
    .catch(() => res.status(500).send({
      message: 'На сервере произошла ошибка',
    }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({
      data: user,
    }))
    .catch(() => res.status(404).send({
      message: 'Запрашиваемый ресурс не найден',
    }));
};
