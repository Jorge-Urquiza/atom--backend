import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateDto } from '../../shared/validator';
import { AuthDto } from '../../application/dtos/auth/auth.dto';


const router = Router();

router.post('/login', validateDto(AuthDto), AuthController.login);

export default router;