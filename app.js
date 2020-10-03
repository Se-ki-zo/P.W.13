const express = require('express');

const {
  PORT = 3000,
} = process.env;
const app = express();

const cards = require('./routes/cards.js');
const users = require('./routes/users.js');
const otherReq = require('./routes/other.js');

app.use('', express.static(`${__dirname}/public`));

app.use('/', cards);
app.use('/', users);
app.use('/', otherReq);

app.listen(PORT, () => {
  console.log(`
  ======================
  Server has been started.
  ======================
  Current port: [ ${PORT} ].
  ======================
  Current time [ ${new Date().getHours()}:${new Date().getMinutes()} ]
  ======================
  Enjoy this crap. :)
  ======================
  `);
});
