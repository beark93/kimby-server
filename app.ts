import express from 'express';
import router from './routes';
import { checkClientIp } from './utils/utils';

const app = express();
const port = 3001;

app.set('trust proxy', true);

const whiteList = ['::1', '::ffff:52.79.140.247'];
app.use((req, res, next) => {
  const clientIpAddress = checkClientIp(req) || '';
  if (whiteList.indexOf(clientIpAddress) === -1) {
    res.status(500).json({
      message: clientIpAddress + ' IP가 whiteList에 미존재',
    });
  } else {
    next();
  }
});

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
