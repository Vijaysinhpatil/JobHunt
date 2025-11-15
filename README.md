# 💼 JobHunt — MERN Stack Job Search Platform

JobHunt is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It connects **job seekers** and **recruiters** — allowing candidates to search and apply for jobs while recruiters can post and manage job listings.

---

## 🚀 Features

### 👩‍💻 For Job Seekers
- Browse and search for jobs by title, company, or location  
- Apply for jobs directly through the portal  
- Track your applications  
- Filter jobs by category, location, or role  

### 🏢 For Recruiters
- Create and manage job postings  
- View all applications received  
- Edit or delete job listings  

### ⚙️ For Admins
- Manage users and company accounts  
- Oversee job postings and site content  

### 💡 General Features
- Role-based authentication (User / Recruiter / Admin)  
- Responsive UI using React  
- RESTful API architecture  
- Secure data management with MongoDB  
- Environment-based configuration using dotenv  

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Tokens), bcrypt |
| Environment Config | dotenv |
| Version Control | Git & GitHub |

---

## 📂 Project Structure

```

JobHunt/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Page components (Jobs, Profile, etc.)
│ │ ├── redux/ # Redux slices and store
│ │ └── utils/ # Constants, helpers
│ └── package.json
│
├── server/ # Express backend
│ ├── routes/ # API route definitions
│ ├── models/ # Mongoose schemas
│ ├── controllers/ # Route logic and handlers
│ ├── utils/ # Database connection and helpers
│ └── server.js # Entry point
│
├── .env.example # Example environment variables
└── README.md

```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Vijaysinhpatil/JobHunt.git
cd JobHunt

```

### 2️⃣ Setup the backend

```
cd server
npm install
```

#### Create a .env file inside the server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

### Start the backend server:

```
npm start
```

### 3️⃣ Setup the frontend

```
cd ../client
npm install
npm run dev
```

### Now open your browser and visit:

```
http://localhost:5173
```

## 📸 Screenshots

### 🏠 Home Page
![Home Page](client/public/screenshots/home.png)

### 💼 Job Details
![Job Details](client/public/screenshots/job-details.png)

### 🧑‍💼 Recruiter Dashboard
![Recruiter Dashboard](client/public/screenshots/recruiter-dashboard.png)
