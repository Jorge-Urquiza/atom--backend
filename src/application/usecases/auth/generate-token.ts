import jwt from 'jsonwebtoken';
import { User } from '../../../domain/entities/user';
import { config } from '../../../shared/config';

export class GenerateToken {
  constructor() {}

  execute(user: User): string {
    const secret = config.JWT_SECRET;
    const expiresIn ='1h';
    if (!user?.id || !user?.email) {
      throw new Error('Invalid user data for token generation');
    }
    const payload = { userId: user.id, email: user.email };
    return jwt.sign(payload, secret, { expiresIn });
  }
}