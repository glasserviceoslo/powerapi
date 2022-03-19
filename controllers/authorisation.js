const url = require('url');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const axios = require('axios');

const auth_key = `${process.env.APP_KEY}:${process.env.CLIENT_KEY}`;
const buff = new Buffer.from(auth_key);
const BASE64_AUTH = buff.toString('base64');

const params = new url.URLSearchParams({ grant_type: 'client_credentials' });

const options = {
  method: 'POST',
  url: 'https://api-demo.poweroffice.net/OAuth/Token',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${BASE64_AUTH}`,
  },
  data: params.toString(),
};

const getToken = async () => {
  const response = await axios(options);
  return response.data;
};

module.exports = { getToken };
