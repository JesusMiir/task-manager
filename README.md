# 🧠 Task Manager – by Jesús Mercadal

**Task Manager** is a Trello-like web application designed to help users organize and manage their daily tasks efficiently. It supports role-based access control, dynamic task management, and provides a clean and modern UI.

---

## 🚀 Technologies Used

### Frontend

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@heroicons/react](https://github.com/tailwindlabs/heroicons)
- Server Actions (experimental)

### Backend

- Next.js API routes (Edge-compatible)
- PostgreSQL (hosted on [Neon.tech](https://console.neon.tech))
- Prisma ORM

### Deployment

- Deployed on [Vercel](https://vercel.com/jesusmercadalmirs-projects/task-manager/9cfSkLyDSbqD1CRAZouDEUtC92bJ)
- HTTPS automatically managed by Vercel

---

## 🧩 Features

### ✅ Core Features

- Login and session-based authentication
- Role-based access (Admin vs Regular User)
- Trello-style task board (To Do, In Progress, Done)
- Create, edit, and delete tasks
- Task filtering
- Simple and responsive design
- Admin-only user listing

---

## 👤 Test Credentials

You can log in with the following test user:

Email: jesus@jesus.com
Password: password123

Or register and create your own user from the **Register** page.

---

## 🧠 My Approach

I started from the official **Next.js Learn Course** tutorial and progressively refactored and extended it to build a full-featured Task Manager application:

- Adapted server components and actions to manage tasks
- Added Trello-like functionality with role separation
- Focused on clean, modular and scalable architecture
- Reused UI components and ensured a consistent minimal design
- Integrated authentication and task workflows

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/JesusMiir/task-manager.git
cd task-manager

```

Install dependencies

pnpm install

Set up environment variables

DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

Push the Prisma schema

npx prisma db push

Run the development server

pnpm dev

Build for production

pnpm build
pnpm start

Deployment

Hosted on Vercel
Database hosted on Neon.tech
HTTPS and domain configuration handled automatically by Vercel

Future Improvements

OAuth support (Google, GitHub, etc.)
User avatars and profile management
Real-time updates with WebSockets
Notifications and reminders
Task assignment between users
Drag-and-drop columns and tasks
