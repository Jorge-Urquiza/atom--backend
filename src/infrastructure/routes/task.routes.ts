import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/authenticate';
import { validateDto } from '../../shared/validator';
import { CreateTaskDto } from '../../application/dtos/task/create-task.dto';
import { UpdateTaskDto } from '../../application/dtos/task/update-task.dto';

const router = Router();

router.use(authenticate);

router.get('/', TaskController.getTasks);
router.post('/', validateDto(CreateTaskDto), TaskController.createTask);
router.put('/:id', validateDto(UpdateTaskDto), TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;