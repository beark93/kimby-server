import express from 'express';

import pokeController from '../../controllers/poke';

const router = express.Router();

router.get('/list', pokeController.list);

export default router;
