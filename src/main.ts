import express from 'express';
import cors from 'cors';
import taskRoutes from './infrastructure/routes/task.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/ping', (_req, res) => {
  res.status(200).send({
    id: 1,
    message: 'pong',
  });
});

export default app;
