# 🌾 RuralConnect - Community Hub

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow)

**RuralConnect** is a full-stack web application prototype designed to help rural communities easily find and access essential products and services. This platform aims to bridge the gap between local needs and available resources through a **simple, user-friendly interface**.

---

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Installation & Setup](#-installation--setup)
  - [1. Clone & Setup](#1-clone--setup)
  - [2. Backend Setup](#2-backend-setup-server)
  - [3. Frontend Setup](#3-frontend-setup-client)
- [🔑 Demo Login](#-demo-login)
- [📸 Screenshots](#-screenshots)
- [📜 License](#-license)

---

## ✨ Features

- 🏠 **Homepage**
  - Services Section
  - Available Products Section
  - News & Updates
  - Contact Form

- 🔐 **User Authentication**
  - Secure Registration & Login

- 👤 **User Dashboard**
  - Profile Information
  - Past Bookings List
  - Edit Profile Details (phone number)

- 🛍️ **Product Management**
  - Dynamic product listings from database
  - Search functionality

- 🛒 **Shopping Cart**
  - Persistent cart with quantity adjustments

- 📅 **Booking System**
  - Checkout creates a booking record linked to profile

---

## 🛠️ Tech Stack

### ⚡ Frontend
- React.js
- Tailwind CSS
- Lucide-React (Icons)
- Axios
- React Router

### ⚙️ Backend
- Node.js
- Express.js
- bcrypt.js (Password hashing)
- JWT (Authentication)

### 🗄️ Database
- PostgreSQL
- Neon (serverless PostgreSQL hosting)

---

## 🚀 Installation & Setup

### ✅ Prerequisites
- Node.js (v18 or later recommended)
- Neon account for PostgreSQL hosting

---

### 1. Clone & Setup
```bash
git clone https://github.com/Arijeet-10/rural_connect.git
cd rural_connect
```

### 2. Backend Setup (server)
Navigate to the server directory:
```bash
cd rural_connect/server
```

Create `.env` file:
```env
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET="choose_a_strong_secret_key"
```

Install dependencies & start backend:
```bash
npm install
node index.js
```
Backend runs on 👉 http://localhost:5000

### 3. Frontend Setup (client)
Navigate to client folder:
```bash
cd rural_connect/client
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Install dependencies & start frontend:
```bash
npm install
npm run dev
```
Frontend runs on 👉 http://localhost:5173

---

## 🔑 Demo Login
You can register a new user or use demo credentials:
- **Username:** admin
- **Password:** password123


---

## 📜 License
This project is licensed under the MIT License.


You are free to use, modify, and distribute this software for educational and commercial purposes.
