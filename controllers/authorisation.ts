import url from 'url';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../.env') });

const auth_key = `${process.env.PO_APP_KEY}:${process.env.PO_CLIENT_KEY}`;
const buff = Buffer.from(auth_key);
const BASE64_AUTH = buff.toString('base64');

const params = new url.URLSearchParams({ grant_type: 'client_credentials' });

const PO_OAUTH = 'https://api-demo.poweroffice.net/OAuth/Token';
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${BASE64_AUTH}`,
  },
  body: params.toString(),
};

export const getToken = async () => {
  const res = await fetch(PO_OAUTH, options);
  const data = res.json();
  return data;
};
