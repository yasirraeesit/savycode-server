# SovYCode — Backend API Gateway

> **Robust, resilient Express & MongoDB API service powering the SovYCode digital studio platform.**

Handles lead intake, discovery call scheduling, scope estimates, and job applicant dossiers with automatic local and cloud MongoDB persistence.

---

## 🌟 Features

- **Express & Node.js Architecture**: Clean RESTful API gateway with CORS and JSON body-parser.
- **MongoDB & Mongoose Integration**: Persists collections directly into the `sovycode` database (`leads`, `estimates`, `applications`).
- **Resilient Fallback**: Graceful in-memory fallback if MongoDB is briefly unreachable, ensuring 100% uptime for local development.
- **Node --watch Dev Mode**: Native zero-dependency hot reloading in development.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 4
- **Database**: MongoDB (via Mongoose ODM)
- **Environment Management**: Dotenv
- **Security & Networking**: CORS

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root of `server/`:
```env
PORT=5000
DB_NAME=sovycode
MONGODB_URI=mongodb://127.0.0.1:27017/sovycode
```
*(For MongoDB Atlas, paste your connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/sovycode?retryWrites=true&w=majority`)*

### 3. Start Server

#### Development Mode (Auto-restart on save):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```
The server will listen at `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Root API status & database name |
| `GET` | `/api/health` | Health check & MongoDB connection status |
| `POST` | `/api/leads` | Create a discovery call inquiry / contact lead |
| `GET` | `/api/leads` | Retrieve all active leads (admin view) |
| `POST` | `/api/estimates` | Save a project scope & cost blueprint |
| `GET` | `/api/estimates` | Retrieve saved estimates |
| `POST` | `/api/applications` | Submit a candidate job application dossier |
| `GET` | `/api/applications` | Retrieve applicant submissions |

---

## 📂 Project Structure

```text
server/
├── models/
│   ├── Lead.js             # Discovery inquiries & leads schema
│   ├── Estimate.js         # Cost & timeline blueprint schema
│   └── Application.js      # Job candidate applications schema
├── routes/
│   └── api.js              # REST endpoints & persistence logic
├── .env.example            # Environment template
├── .gitignore              # Ignores node_modules, .env, and logs
├── package.json
├── README.md
└── server.js               # Server entry point & DB connection
```

---

## 📄 License
100% Proprietary — All rights reserved by SovYCode.
