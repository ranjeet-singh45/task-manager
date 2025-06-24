import { Task } from '../models/index.js';

// 🔹 GET /api/tasks
export async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

// 🔹 POST /api/tasks
export async function createTask(req, res) {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const task = await Task.create({ title, user_id: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    console.error("Failed to create task:", err);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

// 🔹 PUT /api/tasks/:id — update title and/or status
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    const { status, title } = req.body;

    if (status) task.status = status;
    if (title) task.title = title;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Failed to update task:", err);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

// 🔹 DELETE /api/tasks/:id — delete task
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Task.destroy({
      where: { id, user_id: req.user.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("Failed to delete task:", err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
