
# 📋 Collaborative Task Manager (MERN Stack)

A simple collaborative task management application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The app allows users to create tasks, assign them to team members, update task status, and view or delete tasks with filter options.

---

## 🚀 Features

- ✅ Create a task with:
  - Title
  - Description
  - Assigned To (team member name)
  - Status: `To Do`, `In Progress`, `Done`
- 🔁 Update task status
- 🔍 Filter tasks:
  - By status
  - By assignee
- 🗑️ Delete a task
- 🧑‍🤝‍🧑 Collaboration-friendly design

---

## 🛠️ Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React.js (Hooks, JSX)       |
| Backend      | Node.js, Express.js         |
| Database     | MongoDB (with Mongoose ODM) |
| Styling      | CSS or Bootstrap / Material-UI |
| Version Ctrl | Git / GitHub                |

---

## 🏗️ Project Structure

```
client/               # React Frontend
  └── src/
      └── components/
      └── pages/
      └── App.js

server/               # Express Backend
  └── models/         # Mongoose Schemas
  └── routes/         # Task Routes
  └── controllers/    # Task Logic
  └── server.js       # Entry Point

README.md
package.json
```

---

## ⚙️ Setup Instructions

### 🖥️ Backend

```bash
cd server
npm install
# Create .env and add MONGO_URI and PORT
npm start
```

### 🌐 Frontend

```bash
cd client
npm install
npm start
```

---

## 🧪 API Documentation

### Base URL:
```
http://localhost:5000/api/tasks
```

### 📌 Endpoints:

#### `POST /create`
Create a new task
```json
{
  "title": "Frontend Design",
  "description": "Design dashboard UI",
  "assignedTo": "Alice",
  "status": "To Do"
}
```

#### `GET /`
List all tasks

#### `GET /status/:status`
Filter tasks by status

#### `GET /assigned/:name`
Filter tasks by assignee

#### `PUT /update/:id`
Update a task’s status
```json
{
  "status": "In Progress"
}
```

#### `DELETE /delete/:id`
Delete a task

---

## 👥 Team Collaboration

- **Frontend Developer**: Built UI using React and integrated APIs
- **Backend Developer**: Developed REST API using Express and MongoDB
- **Database Handler**: Designed schema and handled relationships using Mongoose
- **Tester/QA**: Verified features and tested user flow end-to-end
