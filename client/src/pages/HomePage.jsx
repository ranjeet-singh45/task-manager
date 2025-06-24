import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import editIcon from '../assets/pencil-solid.svg';
import saveIcon from '../assets/floppy-disk-solid.svg';
import deleteIcon from '../assets/trash-solid.svg';

const API = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const handleAddTask = async () => {
    if (!title) return toast.error("Task not entered");
    const token = localStorage.getItem("token");
    await axios.post(
      `${API}/tasks`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Task added successfully");
    setTitle("");
    fetchTasks();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${API}/tasks/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) return toast.error("Title cannot be empty");
    const token = localStorage.getItem("token");
    await axios.put(
      `${API}/tasks/${id}`,
      { title: editingTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Task updated");
    setEditingTaskId(null);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const groupedTasks = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  tasks.forEach((task) => groupedTasks[task.status].push(task));

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-300 to-purple-400 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="bg-green-600 hover:bg-green-400 text-white px-3 py-1 rounded-lg cursor-pointer shadow-lg"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-lg cursor-pointer shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="New task title"
            className="flex-grow p-2 text-black/70 rounded-lg border mr-1 border-gray-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-cyan-400 text-white px-4 rounded-lg hover:bg-cyan-500 cursor-pointer"
          >
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(groupedTasks).map((status) => (
            <div
              key={status}
              className="bg-gradient-to-r from-purple-300 to-cyan-300 backdrop-blur p-4 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{status}</h2>
              {groupedTasks[status].map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between bg-white/70 backdrop-blur-lg p-2 mb-2 rounded-lg"
                >
                  {/* 🔹 Task Title OR Edit Input */}
                  <div className="w-[40%]">
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="w-full text-sm border rounded px-2 py-1"
                      />
                    ) : (
                      <span className="text-sm font-medium">{task.title}</span>
                    )}
                  </div>

                  {/* Edit / Save +  Delete */}
                  <div className="flex items-center gap-2">
                    {editingTaskId === task.id ? (
                      <button
                        onClick={() => handleSaveEdit(task.id)}
                        className="text-green-600 ml-2 transition-transform duration-200 hover:scale-125"
                        title="Save"
                      >
                        <img src={saveIcon} alt="edit" className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-blue-600  transition-transform duration-200 hover:scale-125 cursor-pointer"
                        title="Edit"
                      >
                      <img src={editIcon} alt="edit" className="w-5 h-5" />
                        
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 transition-transform duration-200 hover:scale-125"
                      title="Delete"
                    >
                      <img src={deleteIcon} alt="edit" className="w-4 h-4" />
                    </button>
                  </div>

                  {/*Status Dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                    className="ml-4 text-sm rounded p-1 border"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              ))}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
