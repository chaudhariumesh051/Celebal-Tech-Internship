# 📁 File Management Tool

A simple full-stack application that allows users to **create**, **read**, and **delete** text files on the server using:

- ✅ **Node.js core modules** (`fs`, `http`, `path`) for the backend
- ✅ **React + Vite** for a modern, responsive frontend

----------------------------------------------------------------------------

## 🚀 Features

- Create new text files with custom content
- Read content from existing files
- Delete files easily
- Built using only Node.js core modules (no Express)
- Minimal and clean React interface

----------------------------------------------------------------------------

## 🧠 Folder Structure

file-manager/
├── backend/
│ ├── files/ # Directory where files are stored
│ └── server.js # Node.js server using core modules
├── frontend/
│ ├── index.html
│ ├── package.json
│ └── src/
│ ├── App.jsx # React frontend
│ ├── App.css # Styling
│ └── main.jsx # React DOM entry point
└── README.md

----------------------------------------------------------------------------

🖥️ 1. Run the Backend

cd backend
mkdir files          # Create a folder to store text files
node server.js       # Starts server at http://localhost:5000

🌐 2. Run the Frontend

cd ../frontend
npm install
npm run dev          # Starts frontend at http://localhost:5173