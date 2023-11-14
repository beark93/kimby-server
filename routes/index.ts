import express from 'express';
import uberRoutes from './uber';
import pokeRoutes from './poke';

const router = express.Router();

router.use('/uber', uberRoutes);
router.use('/poke', pokeRoutes);

export default router;
