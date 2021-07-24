import express from 'express';
import controller from '../controllers/LookupController';

const router = express.Router();

router.get('/activities', controller.activities);

export default router;