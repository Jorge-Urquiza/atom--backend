import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;