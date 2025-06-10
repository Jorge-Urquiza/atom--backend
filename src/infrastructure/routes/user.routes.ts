import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { CreateUserDto } from '../../application/dtos/user/create-user.dto';
import { validateDto } from '../../shared/validator';

const router = Router();

router.post('/', validateDto(CreateUserDto), UserController.create);

export default router;