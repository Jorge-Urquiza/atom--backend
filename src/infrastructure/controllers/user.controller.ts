import { NextFunction, Request, Response } from 'express';

import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import { FindUserByEmail } from '../../application/usecases/users/find-user-by-email';
import { CreateUser } from '../../application/usecases/users/create-user';

const userRepository = new UserRepositoryImpl();
export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const dto = req.body;
      const createUser = new CreateUser(userRepository);
      const user = await createUser.execute(dto);
      res.status(200).json(user);
    } catch (err) {
      console.error('Error create:', err);
      res.status(500).json({ message: 'Error user', error: err });
    }
  }

  static async findByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const useCase = new FindUserByEmail(userRepository);
      const user = await useCase.execute(email);
       if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      console.error('Error findByEmail:', err);
      res.status(500).json({ message: 'Error user', error: err });
    }
  }
}