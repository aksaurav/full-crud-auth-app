# Collaboratron — AI-Powered Real-Time Collaborative Editor

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

Collaboratron is a high-performance, full-stack collaborative document editing platform. It enables multiple users to work on the same document simultaneously with sub-100ms synchronization latency, powered by a robust WebSocket architecture and integrated LLM assistance.

[Live Demo](https://collaboration-app-1.onrender.com) | [Backend Repository](https://github.com/your-username/collaboratron-server)

---

## 🚀 Key Features

* **Real-Time Collaboration:** Seamless multi-user editing with live cursor tracking and instant state synchronization using **Socket.io**.
* **AI "Ghostwriter" Assistant:** Integrated **OpenAI/GROQ LLMs** to provide context-aware content generation, automatic summarization, and real-time grammar corrections.
* **Version Control & Snapshots:** A built-in history system that allows users to create manual snapshots and restore previous document states with one click.
* **Secure Multi-Tenancy:** Robust user authentication (JWT) and document-level permissions ensuring secure, private collaboration.
* **Conflict-Free Editing:** Custom event listeners integrated with **React-Quill** to ensure smooth synchronization without cursor jumping.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, React-Quill, Lucide React |
| **Backend** | Node.js, Express.js (MVC Pattern), ES Modules |
| **Real-Time** | Socket.io (WebSockets) |
| **Database** | MongoDB (Mongoose ODM) |
| **AI/LLM** | OpenAI API / GROQ API |
| **Deployment** | Render (Backend), Vercel (Frontend) |

---

## 🏗️ Architecture

The project follows a modular **Model-View-Controller (MVC)** pattern to ensure scalability and separation of concerns:

```text
├── client/                # React frontend application
└── server/                # Node.js backend logic
    ├── config/            # Socket & Database configurations
    ├── controllers/       # Business logic (Document & AI handling)
    ├── models/            # Mongoose schemas (User, Document, Version)
    ├── routes/            # Secure API endpoints
    └── middleware/        # JWT Authentication & Error handling



1. 🔧 Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/collaboratron.git](https://github.com/your-username/collaboratron.git)
cd collaboratron


2. Install backend dependencies
npm install

Install frontend dependencies
cd client && npm install

3. Environment Setup:
Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key


 4. Run the app:

Bash
 From the root directory
npm run dev


🌐 Deployment Note
The backend is hosted on Render. Since it is on the free tier, the server may "spin down" after inactivity. Please allow 30-60 seconds for the initial connection to establish upon the first visit.


## 📄 License
This project is licensed under the MIT License.



***

### **Pro-Tip for a "100/100" GitHub Profile:**
Since you are applying for remote roles in Australia and Europe, add a **GIF** of the real-time editing right under the main title. You can record your screen with two windows open, upload the video to a site like [ezgif.com](https://ezgif.com), and then add it to the README like this:
`![Collaboratron Demo](link-to-your-gif.gif)`
