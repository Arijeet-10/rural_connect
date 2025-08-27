# 🌾 RuralConnect - Community Hub  

**RuralConnect** is a full-stack web application prototype designed to help rural communities easily find and access essential products and services.  
This platform aims to bridge the gap between local needs and available resources through a **simple, user-friendly interface**.  

---

## ✨ Features Covered  

### 🏠 Homepage  
An attractive and responsive landing page featuring:  
- **Services Section**  
- **Available Products Section**  
- **News & Updates**  
- **Contact Form**  

### 🔐 User Authentication  
- Secure user **registration and login** flow.  

### 👤 User Dashboard  
A personalized dashboard for logged-in users to:  
- View their profile information.  
- See a list of their past bookings.  
- Edit their basic profile details (phone number).  

### 🛍️ Product Management  
- Dynamic product listings fetched from the database.  
- Search functionality to filter products.  

### 🛒 Shopping Cart  
- Add items to a **persistent shopping cart**.  
- Adjust item quantities or remove them.  

### 📅 Booking System  
- Logged-in users can **check out their cart**, which creates a booking record in the database linked to their profile.  

---

## 🛠️ Tech Stack  

### ⚡ Frontend  
- **React.js** – JavaScript library for building UIs  
- **Tailwind CSS** – Utility-first CSS framework  
- **Lucide-React** – Beautiful and consistent icons  
- **Axios** – Promise-based HTTP client  
- **React Router** – Client-side routing  

### ⚙️ Backend  
- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web application framework  
- **bcrypt.js** – Secure password hashing  
- **JWT (JSON Web Tokens)** – Authentication tokens  

### 🗄️ Database  
- **PostgreSQL** – Open-source relational database  
- **Neon** – Serverless PostgreSQL hosting  

---

## 🚀 How to Run the App Locally  

### ✅ Prerequisites  
- **Node.js** (v18 or later recommended)  
- **Neon account** for PostgreSQL hosting  

### 🔧 1. Clone & Setup  
```bash
git clone https://github.com/Arijeet-10/rural_connect.git
cd rural_connect
🔧 2. Backend Setup (server)
Navigate to the server directory:

bash
Copy code
cd rural_connect/server
Create a .env file and add:

env
Copy code
# server/.env
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET="choose_a_strong_secret_key"
Install dependencies:

bash
Copy code
npm install
Run the database schema SQL (from setup guide) in Neon SQL editor to create tables.

Start the backend server:

bash
Copy code
node index.js
Server will run on 👉 http://localhost:5000

🔧 3. Frontend Setup (client)
Open a new terminal and navigate:

bash
Copy code
cd rural_connect/client
Create a .env file for frontend:

bash
Copy code
touch .env
Add backend API URL:

env
Copy code
# client/.env
VITE_API_URL=http://localhost:5000
Install dependencies:

bash
Copy code
npm install
Start React development server:

bash
Copy code
npm run dev
Frontend will open 👉 http://localhost:5173

🔑 Demo Login
You can register a new user or use these credentials for demo:

Username: admin

Password: password123

yaml
Copy code

---

Would you like me to also create a **README.md file** version (with badges, table of contents, and screen