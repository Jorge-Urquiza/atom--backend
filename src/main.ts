import express from 'express';
import cors from 'cors';
import taskRoutes from './infrastructure/routes/task.routes';
import userRoutes from './infrastructure/routes/user.routes';
import authRoutes from './infrastructure/routes/user.routes';
const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;
