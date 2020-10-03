const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

// const cardsJson = (path.join(__dirname, '../data/cards.json'));

router.get('/cards', (req, res) => { // card req
  const filepath = path.resolve('data', 'cards.json');
  fs.readFile(filepath, 'utf8')
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => res.status(500).send(JSON.stringify({
      message: 'Запрашиваемый ресурс не найден',
    })));
});

module.exports = router;
