RuralConnect - Community Hub
RuralConnect is a full-stack web application prototype designed to help rural communities easily find and access essential products and services. This platform aims to bridge the gap between local needs and available resources through a simple, user-friendly interface.

✨ Features Covered
Homepage: An attractive and responsive landing page featuring:

Services Section

Available Products Section

News & Updates

Contact Form

User Authentication: Secure user registration and login flow.

User Dashboard: A personalized dashboard for logged-in users to:

View their profile information.

See a list of their past bookings.

Edit their basic profile details (phone number).

Product Management:

Dynamic product listings fetched from the database.

Search functionality to filter products.

Shopping Cart:

Add items to a persistent shopping cart.

Adjust item quantities or remove them from the cart.

Booking System: Logged-in users can "check out" their cart, which creates a booking record in the database linked to their profile.

🛠️ Tech Stack
This project is built with a modern, full-stack JavaScript architecture.

Frontend:

React.js: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Lucide-React: A library of beautiful and consistent icons.

Axios: A promise-based HTTP client for making API requests.

React Router: For handling client-side routing and navigation.

Backend:

Node.js: A JavaScript runtime environment.

Express.js: A minimal and flexible Node.js web application framework.

bcrypt.js: For hashing user passwords securely.

JSON Web Tokens (JWT): For creating secure authentication tokens.

Database:

PostgreSQL: A powerful, open-source object-relational database system.

Neon: A serverless PostgreSQL platform for hosting the database.

🚀 How to Run the App Locally
To get the application running on your local machine, follow these steps.

Prerequisites
Node.js (v18 or later recommended)

A Neon account to host the PostgreSQL database.

1. Clone & Setup
First, clone the repository and set up the project structure as described in the setup guide.

2. Backend Setup (server)
Navigate to the server directory:

cd rural_connect/server

Create a .env file and add your Neon database connection string and a JWT secret:

# server/.env
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET="choose_a_strong_secret_key"

Install the dependencies:

npm install

Run the database schema SQL from the setup guide in your Neon SQL editor to create the tables.

Start the backend server:

node index.js

The server will be running on http://localhost:5000.

3. Frontend Setup (client)
Open a new terminal window and navigate to the client directory:

cd rural_connect/client

Create a new environment file for the frontend. In your terminal, run:

touch .env

Add the backend API URL to this new .env file. This prevents hardcoding the URL in your components.

# client/.env
VITE_API_URL=http://localhost:5000

Install the dependencies:

npm install

Start the React development server:

npm run dev

The application will open in your browser, usually at http://localhost:5173.

🔑 Demo Login
You can register a new user or use the following credentials for a quick demonstration after registering:

Username: admin 

Password: password123