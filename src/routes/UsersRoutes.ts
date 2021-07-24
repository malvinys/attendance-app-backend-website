import express from 'express';
import controller from '../controllers/UsersController';

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/:userId', controller.getUserDetail);
router.post('/', controller.createUser);
router.patch('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export default router;