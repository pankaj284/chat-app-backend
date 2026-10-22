
#Chat App — Backend

The Node.js + Express + MongoDB backend for a real-time MERN chat application. Handles authentication, chats, messages, and real-time delivery via Socket.io.

**[Live API](https://chat-app-backend-9gr3.onrender.com)**  
**[Frontend Repository](https://github.com/pankaj284/chat-app-frontend.git)**

---

## Features

- JWT authentication (register / login)
- User management
- 1-on-1 chat creation and retrieval
- Message persistence in MongoDB
- Real-time message delivery via Socket.io
- Protected routes with middleware
- RESTful API design

---

## Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database + ODM
- **Socket.io** — Real-time communication
- **JWT (jsonwebtoken)** — Auth tokens
- **Bcrypt** — Password hashing
- **CORS** — Cross-origin support

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_BACKEND_REPO.git
cd YOUR_BACKEND_REPO
npm install
