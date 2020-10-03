const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const filepath = path.resolve('data', 'users.json');
// const userJson = require('../data/users.json'); // err

router.get('/users', (req, res) => { // users req
  fs.promises.readFile(filepath, 'utf8')
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => res.status(500).send(JSON.stringify({
      message: 'Запрашиваемый ресурс не найден',
    })));
});

router.get('/users/:id', (req, res) => { // Id req
  const userJson = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const {
    id,
  } = req.params;

  let access = false;
  let userInfo;

  for (let i = 0; i < userJson.length; i += 1) {
    if (id === userJson[i]._id) {
      userInfo = userJson[i];
      access = true;
    }
  }

  if (!access) {
    res.status(404).send(JSON.stringify({
      message: 'Нет пользователя с таким id',
    }));
  } else if (access) {
    res.status(200).send(userInfo);
  }
});

module.exports = router;
