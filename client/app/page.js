'use client';

import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/tasks';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [assignedToFilter, setAssignedToFilter] = useState('');


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [createStatus, setCreateStatus] = useState('To Do');


  const fetchTasks = async () => {
    try {
      const query = new URLSearchParams();
      if (statusFilter) query.append('status', statusFilter);
      if (assignedToFilter) query.append('assignedTo', assignedToFilter);

      const res = await fetch(`${API_URL}?${query.toString()}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, assignedToFilter]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks();
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const newTask = { title, description, assignedTo, status: createStatus };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setCreateStatus('To Do');
      fetchTasks();
    } else {
      alert('Failed to create task');
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>


      <form onSubmit={handleCreateTask} className="mb-8 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
          <textarea
            className="border p-2 rounded col-span-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            className="border p-2 rounded"
            value={createStatus}
            onChange={(e) => setCreateStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>


      <div className="mb-4 flex gap-4">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Filter by assignee"
          value={assignedToFilter}
          onChange={(e) => setAssignedToFilter(e.target.value)}
        />
      </div>
      
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="grid gap-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p>
                <strong>Assigned To:</strong> {task.assignedTo}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="ml-2 p-1 border rounded"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </p>
              <button
                onClick={() => handleDelete(task._id)}
                className="mt-3 text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
