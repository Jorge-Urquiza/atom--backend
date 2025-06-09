import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.get('/:userId', TaskController.getTasksByUser);

export default router;