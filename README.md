# 🧠 Task Manager – by Jesús Mercadal

Task Manager is a Trello-like web application designed to help users organize and manage their daily tasks efficiently. It supports role-based access control, dynamic task management, and provides a clean and modern UI.

## 🚀 Technologies Used

### Frontend

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@heroicons/react](https://github.com/tailwindlabs/heroicons)
- Server Actions (experimental)

### Backend

- Next.js API routes (Edge-compatible)
- PostgreSQL (hosted on AWS RDS)
- Prisma ORM

### DevOps & Deployment

- Deployed on **AWS EC2**
- PostgreSQL en **Amazon RDS**
- HTTPS & dominio aún en configuración (AWS por defecto)
- Assets hosted on AWS S3 + CloudFront (en progreso)

---

## 🧩 Features

### ✅ Core Features

- Login y acceso por sesión básica
- Role-based access (Admin vs Regular User)
- Task board tipo Trello (To Do, In Progress, Done)
- Crear, Editar y Eliminar tareas
- Filtro de tareas
- Diseño simple y responsive
- Vista de todos los usuarios (solo admin)

---

## 🧠 My Approach

He seguido el tutorial oficial de **Next.js Learn Course** como base inicial, y he adaptado su arquitectura para convertirlo en una aplicación tipo **Task Manager** funcional con autenticación básica y gestión de tareas. También modifiqué la lógica interna y las acciones para ajustarlas a las necesidades de un sistema Trello-like con separación por roles.

Me he centrado en:

- Reutilización de componentes y lógica de servidor (actions)
- Código limpio, modular y extensible
- Separación clara de responsabilidades
- Estilo visual minimalista con Tailwind

---

## ⚙️ Setup Instructions

### 1. Clona el repositorio

```bash
git clone https://github.com/JesusMiir/task-manager.git
cd task-manager
```
