import express from 'express';

import uberController from '../../controllers/uber';

const router = express.Router();

router.get('/list', uberController.list);

export default router;
