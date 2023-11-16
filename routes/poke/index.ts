import express from 'express';

import pokeController from '../../controllers/poke';

const router = express.Router();

router.get('/list', pokeController.list);
router.get('/:id', pokeController.detail);

export default router;
