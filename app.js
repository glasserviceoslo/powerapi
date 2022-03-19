const express = require('express');
const cors = require('cors');
const { getToken } = require('./controllers/authorisation');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (_req, res) => {
  const response = await getToken();
  console.log(response);
  res.json(response);
});

module.exports = app;
