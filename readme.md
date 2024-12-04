# AI Task Planner

The AI Task Planner is a web application designed to help users manage their tasks efficiently. It leverages Django for the backend, React with TypeScript for the frontend, and OpenAI's GPT-4 model for intelligent task scheduling.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Usage](#usage)
   - [Authentication](#authentication)
   - [Task Management](#task-management)
   - [Time Slot Management](#time-slot-management)
   - [AI Scheduler](#ai-scheduler)
   - [Admin Panel](#admin-panel)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Development Features](#development-features)

## Features

1. **User Authentication**: Secure login/logout functionality using token-based authentication (JWT).
2. **Task Management**: Add, view, and organize tasks with details like name, priority, urgency, and duration.
3. **Time Slot Management**: Dynamically allocate free time slots and prevent conflicting schedules.
4. **AI-Powered Scheduler**: Automatically suggest the best schedule to complete tasks using OpenAI's GPT-4 model.
5. **Responsive and User-Friendly UI**: Built using React and Tailwind CSS for a professional and production-level design.
6. **Admin Panel**: Manage users, tasks, and time slots with secure superuser authentication.

## Technologies

- **Frontend**: React (with TypeScript), Tailwind CSS, DaisyUI, Vite, React hooks
- **Backend**: Django, Django REST Framework (DRF), OpenAI API
- **Database**: SQLite (for development)
- **Tools and Libraries**: pnpm, JWT, Axios, jwt-decode

## Getting Started

### Prerequisites

- [Python](https://www.python.org/downloads/) (version 3.7 or higher)
- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [pnpm](https://pnpm.io/installation) (package manager for frontend dependencies)

### Installation

1. Clone the repository:

```
git clone git@github.com:tranquilitybase07/task-planner.git
```

2. Setup the backend

```
cd ai-task-planner/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. Add OpenAI key
```
tasks/utils.py
```

5. Set up the frontend (Node version >=20)

```
cd ../frontend
pnpm install
pnpm dev
```

4. Open your web browser and navigate to `http://localhost:5173` to access the AI Task Planner application.

## Usage

### Authentication

- Register or log in to access the dashboard.
- A token is generated upon successful login and used for accessing protected API routes.

### Task Management

- Add tasks with details like name, priority, urgency, and duration.
- Tasks are displayed in the Todo tab and can be marked as complete.

### Time Slot Management

- Define your free time slots (e.g., "Monday: 10:00 AM to 12:00 PM").
- The backend ensures task schedules align with the available time slots.

### AI Scheduler

- The OpenAI API generates an optimized schedule based on your tasks and free slots.
- View and follow the AI's recommendations for completing tasks.

### Admin Panel

- Access the admin panel at `/admin` for managing users, tasks, and time slots.
- Secure superuser authentication is required for accessing the admin panel.

## Project Structure

The project is organized as follows:

```
ai-task-planner/
├── backend/
│   ├── task_planner/
│   ├── tasks/
│   ├── manage.py
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── pnpm-lock.yaml
└── README.md
```

## API Endpoints

### Authentication

| Endpoint              | HTTP Method | Description                       |
| --------------------- | ----------- | --------------------------------- |
| `/api/token/`         | POST        | Obtain access and refresh tokens. |
| `/api/token/refresh/` | POST        | Refresh access tokens.            |

---

### Tasks

| Endpoint           | HTTP Method | Description                                 |
| ------------------ | ----------- | ------------------------------------------- |
| `/api/tasks/`      | GET         | Fetch all tasks for the authenticated user. |
| `/api/tasks/`      | POST        | Add a new task.                             |
| `/api/tasks/<id>/` | PATCH       | Update a task.                              |
| `/api/tasks/<id>/` | DELETE      | Delete a task.                              |

---

### Time Slots

| Endpoint          | HTTP Method | Description           |
| ----------------- | ----------- | --------------------- |
| `/api/timeslots/` | GET         | Fetch all time slots. |
| `/api/timeslots/` | POST        | Add a new time slot.  |

---

### AI Scheduler

| Endpoint         | HTTP Method | Description                              |
| ---------------- | ----------- | ---------------------------------------- |
| `/api/schedule/` | POST        | Generate an optimized schedule using AI. |

## Development Features

- **Live Reloading**: Frontend and backend support hot reloading for faster development.
- **Error Handling**: Comprehensive error handling for invalid inputs and expired tokens.
- **Responsive Design**: Fully mobile-friendly UI.
