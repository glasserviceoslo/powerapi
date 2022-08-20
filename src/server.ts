// import cron from 'node-cron';
// import axios from 'axios';
import app from './app';

const port = process.env.PORT || 3001;

// cron.schedule('* * * * *', async () => {
//   const { data } = await axios.get('http://localhost:3001/v1');
//   console.table(data);
// });

app.listen(port, () => console.log(`App listening on port: ${port}`));
