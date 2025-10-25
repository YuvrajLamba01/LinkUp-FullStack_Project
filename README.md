# 🌐 LINKUP — Modern Social Media Platform

**LINKUP** is a full-featured social media platform built with the **MERN stack**, designed for seamless social interaction, real-time communication, and optimized media sharing — all backed by powerful integrations like **Clerk**, **Inngest**, and **ImageKit**.

---

## 🚀 Overview

LINKUP allows users to:
- 👥 Connect with friends and discover new people  
- 💬 Chat in real time with typing indicators and read receipts  
- 📱 Share 24-hour stories with viewer tracking  
- 📸 Upload and share images instantly with optimized delivery  
- 🔍 Discover users and content based on interests  
- ⚡ Handle background jobs efficiently with **Inngest**

Built for **modern, secure, and scalable social networking**.

---

## 🔑 Key Features

### 🔐 Authentication & Security
- **Clerk Integration** – Secure sign-in and social logins  
- **JWT Tokens** – Stateless authentication for API requests  
- **Protected Routes** – Role-based access control  
- **Session Management** – Safe and persistent user sessions  

### 💬 Real-time Communication
- **Instant Messaging** – One-on-one and group chats  
- **Typing Indicators** – See when others are typing  
- **Read Receipts** – Know when your messages are read  
- **Online Presence** – Real-time online/offline status  

### 📱 Social Features
- **Post System** – Share text and image content  
- **Stories** – 24-hour disappearing posts  
- **Follow/Unfollow System** – Manage your connections  
- **Friend Requests** – Approval-based connection system  
- **News Feed** – Personalized timeline  
- **Notifications** – Real-time alerts  

### 🖼️ Media Management
- **ImageKit Integration** – Fast CDN and image optimization  
- **File Uploads** – Multiple image formats supported  
- **Automatic Optimization** – Compression and resizing for speed  

### ⚙️ Background Processing
- **Inngest Integration** – Async job scheduling  
- **Scheduled Tasks** – Story cleanup, email notifications, etc.  
- **Email System** – Welcome and alert emails via Nodemailer  

---

## 🧠 Tech Stack

### 🖥️ Frontend
- **React 18+**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Custom Hooks**
- **Tailwind CSS**

### ⚙️ Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Socket.io** for real-time messaging
- **Inngest** for background jobs
- **ImageKit** for media optimization
- **Nodemailer** for emails
- **JWT** for authentication

### ☁️ DevOps & Deployment
- **Vercel** – Frontend hosting  
- **Render / Railway** – Backend hosting  
- **MongoDB Atlas** – Cloud database  
- **ImageKit CDN** – Optimized image delivery  

---

## 🏗️ Project Architecture

```

LINKUP/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/            # Axios setup
│   │   ├── app/            # Redux store
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable UI elements
│   │   ├── features/       # Feature-based logic
│   │   ├── pages/          # App pages (Feed, Chat, Login, etc.)
│   │   └── ...
│
├── server/                 # Express Backend
│   ├── configs/            # Config files (DB, ImageKit, etc.)
│   ├── controllers/        # Core logic
│   ├── inngest/            # Background jobs
│   ├── middlewares/        # Auth and utilities
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Entry point

````

---

## ⚙️ Getting Started

### 🧩 Prerequisites
- Node.js **v18+**
- npm **v8+**
- MongoDB Atlas or local MongoDB
- Clerk, ImageKit, and Inngest accounts

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/linkup.git
cd linkup
````

#### Client Setup

```bash
cd client
npm install
```

#### Server Setup

```bash
cd ../server
npm install
```

---

## 🔧 Environment Variables

### 📁 Client (`client/.env`)

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:5000
VITE_IMAGEKIT_URL_ENDPOINT=your-imagekit-endpoint
VITE_IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
```

### 📁 Server (`server/.env`)

```
MONGODB_URI=your-mongodb-connection-string
CLERK_SECRET_KEY=sk_test_...
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
INNGEST_EVENT_KEY=your-inngest-event-key
INNGEST_SIGNING_KEY=your-inngest-signing-key
EMAIL_SERVICE=your-email-service
EMAIL_USER=your-email-username
EMAIL_PASS=your-email-password
JWT_SECRET=your-jwt-secret
PORT=5000
```

---

## 🏃‍♂️ Run Locally

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## 🧩 Core Features Overview

### 🗂️ User Management

* Secure authentication (Clerk)
* Profile customization
* Friend request system
* User search and discovery

### 💬 Messaging System

* Real-time chat (Socket.io)
* Typing indicators & read receipts
* Message notifications

### 📱 Content Sharing

* Posts with images and text
* Likes, comments, shares
* Personalized news feed

### 🎬 Stories

* 24-hour disappearing content
* Auto-expiry and cleanup
* Viewer analytics

### ⚡ Background Jobs

* Email notifications
* Story cleanup
* Analytics & reporting

---

## 🔌 API Overview

|  Method  | Endpoint             | Description          |
| :------: | :------------------- | :------------------- |
| **POST** | `/api/auth/verify`   | Verify Clerk session |
|  **GET** | `/api/auth/profile`  | Get user profile     |
|  **PUT** | `/api/auth/profile`  | Update profile       |
|  **GET** | `/api/users/search`  | Search for users     |
| **POST** | `/api/posts/create`  | Create a post        |
|  **GET** | `/api/posts/feed`    | Get news feed        |
| **POST** | `/api/messages/send` | Send message         |
|  **GET** | `/api/stories/feed`  | Get all stories      |

---

## ☁️ Deployment

### Frontend

Deployed on **Vercel**

### Backend

Deployed on **Render** / **Railway**

### Database

Using **MongoDB Atlas**

### Integrations

* **Clerk** – Authentication
* **Inngest** – Background jobs
* **ImageKit** – Media optimization

---

## ⚡ Performance Highlights

* ⚡ **Lighthouse Score:** 90+
* 🧩 **Optimized Bundle:** Code splitting for speed
* 🚀 **CDN Delivery:** ImageKit-powered assets
* 📱 **Fully Responsive:** Mobile-first UI
* 🔒 **Secure Auth:** Clerk + JWT
* ⏱️ **Async Jobs:** Inngest background tasks

---

## 🤝 Contributing

We welcome contributions!

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m "Add AmazingFeature"

# Push and open a PR
git push origin feature/AmazingFeature
```

---

## 🪪 License

Distributed under the **MIT License**.
See `LICENSE` for more details.

---

## 💬 Support

If you like **LINKUP**, give it a ⭐ on GitHub and feel free to open issues or suggestions.

---

**LINKUP — Connect. Share. Engage.**

```
