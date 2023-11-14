import express from 'express';

import router from './routes';

const app = express();
const port = 3001;

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
