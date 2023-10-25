import express from 'express';
import uberRoutes from './uber';

const router = express.Router();

router.use('/uber', uberRoutes);

export default router;
