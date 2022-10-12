// import cron from 'node-cron';
// import axios from 'axios';
import fs from 'fs';
import https from 'https';
import app from './app';

const port = process.env.PORT || 3001;

const ssl = {
  key: fs.readFileSync('ssl/localhost-key.pem'),
  cert: fs.readFileSync('ssl/localhost.pem'),
};

// cron.schedule('* * * * *', async () => {
//   const { data } = await axios.get('http://localhost:3001/v1');
//   console.table(data);
// });
if (process.env.NODE_ENV !== 'production') {
  https
    .createServer(ssl, app)
    .listen(port, () => console.log(`App listening on port: ${port}`));
}

app.listen(port, () => console.log(`App listening on port: ${port}`));
