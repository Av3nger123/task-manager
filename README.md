# Task Manager

Task Manager is a full-stack application designed to help users manage their tasks efficiently. It includes features for user authentication, task creation, filtering, sorting, and more. The project is built with a **Next.js** frontend and a **Go (Gin)** backend.

---

## Features

### Frontend

- **User Authentication**: Login and registration forms with validation and error handling.
- **Task Management**:
  - Create, update, and delete tasks.
  - View tasks in a paginated table with sorting and filtering options.
  - Task statuses: `Draft`, `In Progress`, and `Completed`.
- **Filters**:
  - Filter tasks by title, status, creation date, or due date.
  - Support for advanced operators like `equals`, `contains`, and `greater than`.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Notifications**: Toast notifications for success and error messages using `sonner`.
- **Dark Mode**: Support for light and dark themes.
- **React Query**: Efficient data fetching and caching for API calls.

### Backend

- **User Authentication**:
  - Secure password hashing with bcrypt.
  - JWT-based authentication for protected routes.
- **Task Management**:
  - CRUD operations for tasks.
  - Filtering, sorting, and pagination support.
- **Database**:
  - SQLite database with GORM for ORM.
  - Auto-migration for database schema.
- **Middleware**:
  - CORS middleware for cross-origin requests.
  - Authentication middleware for protected routes.
- **Health Check**: Endpoint to verify the server's health.

---

## Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **State Management**: React Context and React Query
- **TypeScript**: Strongly typed components and logic

### Backend

- **Framework**: [Gin](https://gin-gonic.com)
- **Database**: SQLite with GORM
- **Authentication**: JWT and bcrypt
- **Language**: Go

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- Go (v1.23 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

## Future Enhancements

- Introduce organizations, allowing users to be assigned to an organization for a collaborative team workspace.
- Implement a Kanban board in the UI for better task visualization and management.
- Add support for customizable and dynamic task statuses.
- Enable email notifications to inform users when a task is assigned or updated.
- Provide multimedia support, Labeling, along with task history and a comments section for better collaboration.
- Hierarchy between tasks (Parent / Child)

### My choice of Enhancements

#### 1. Collaborative Team Workspaces

**Idea**: Introduce organizations where users can be assigned to a specific organization, enabling a collaborative team workspace. Each organization will have its own set of tasks, members, and permissions.

**Challenges**:

- Designing a scalable database schema to support multiple organizations and their relationships with users and tasks.
- Implementing role-based access control (e.g., admin, member) within organizations which are specific to Organization.
- Ensuring secure data isolation (Multi Tenancy) between organizations.(Shared / Specific Data Database)

**Architecture**:

- Extend the database schema to include an `organizations` table and a many-to-many relationship between users and organizations.
- Update the backend to include organization-based filtering for tasks and users.
- Modify the frontend to allow users to switch between organizations and manage their tasks accordingly.

---

#### 2. Kanban Board for Task Visualization

**Idea**: Implement a Kanban board in the UI to provide a visual representation of tasks categorized by their statuses (e.g., `Draft`, `In Progress`, `Completed`).

**Challenges**:

- Designing a drag-and-drop interface for moving tasks between statuses.
- Synchronizing task updates in real-time across multiple users.
- Ensuring compatibility with existing task filtering and sorting features.

**Architecture**:

- Use a library like `dnd-kit` for the drag-and-drop functionality.
- Update the backend to handle batch updates for task statuses when moved on the Kanban board.
- Leverage WebSockets or a polling mechanism to ensure real-time updates for all users viewing the board.

---

**Summary**: These enhancements aim to improve collaboration and task management efficiency. The collaborative team workspaces will enable organizations to manage tasks collectively, while the Kanban board will provide an intuitive and visual way to track task progress. Both features will require careful planning to ensure scalability, security, and seamless integration with the existing system.
