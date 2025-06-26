#  Task Manager (React + Express + PostgreSQL)

A full-stack task management web applicationL. Users can sign up, log in, manage tasks (create, update, delete), and track them by status (To Do, In Progress, Done).

---

##  Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, React Hot Toast
- **Backend**: Node.js, Express.js, JWT Auth
- **Database**: PostgreSQL (via Sequelize ORM)

---

##  Screenshots

![image](https://github.com/user-attachments/assets/c5895514-b486-4802-84e5-6605a1294bfe)

---

##  Features

-  JWT Authentication (Login/Signup)
-  Task creation with title & default status
-  Update task status (To Do, In Progress, Done)
-  Edit task titles
-  Delete tasks
-  Profile page showing user info
-  Logout & protected routes
-  Toast notifications for success/errors

---
##  Local Setup Instructions

1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
2. Setup Backend
 ```
cd server
npm install
```
3. Create a .env file inside /server:
 ```
 PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
JWT_SECRET=your_secret_key
```
4. Start the backend server:
```
nodemon server.js
```
5. Setup Frontend
```
cd client
npm install
```
6. Create a .env file inside /client:
```
VITE_BACKEND_URL=http://localhost:5000/api
```
7. Start the React development server:
```
npm run dev
```
