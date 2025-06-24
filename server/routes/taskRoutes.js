import { Router } from 'express';
const router = Router();

import auth from '../middleware/auth.js';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask 
} from '../controllers/taskControllers.js';

router.use(auth);

router.get('/', getTasks);               
router.post('/', createTask);           
router.put('/:id', updateTask);         
router.delete('/:id', deleteTask);     

export default router;
