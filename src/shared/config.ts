import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
};