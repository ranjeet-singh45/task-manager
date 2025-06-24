import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js'; 
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import profileRoute from './routes/profileRoute.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoute);

app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch((err) => console.error('Database connection failed:', err));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
