# SeeYou — WebRTC Video Conferencing App  
A real-time video conferencing platform built using **WebRTC**, **Socket.IO**, **React**, and **Node.js**.  
It supports **1-to-1 & multi-user video calls**, **chat**, **screen sharing**, **authentication**, and a clean modern UI.

🚀 Live Demo: **https://seeyou-video-conferencing-web-uuqx.onrender.com**

---

## 📌 Overview
**SeeYou** is a lightweight, fast, browser-based video chat application designed to feel like a modern video-calling platform.  
It uses:

- **WebRTC** for real-time peer-to-peer video/audio transfer  
- **Socket.IO** for signaling, messaging & room management  
- **MERN stack** for backend APIs, authentication, and meeting history  
- **Custom UI** built using React + Material UI  

This project demonstrates full understanding of **real-time communication**, **peer connections**, **media permissions**, and **scalable room signaling**.

---

## ⭐ Features

### 🎥 Real-Time Video Calling
- High-quality **WebRTC-based video & audio**
- Works for **multiple participants**
- Automatic stream handling when a user joins/leaves
- Mute/unmute video & audio

### 💬 Live Chat Messaging
- In-call real-time chat
- Messages displayed without delay using Socket.IO
- System messages (user joined/left)

### 🖥️ Screen Sharing
- Share entire screen, window, or browser tab
- Smooth switching between webcam & screen
- Automatically updates on other participant screens

### 🧍 Authentication System
- User **registration** & **login**
- Passwords protected with **bcrypt hashing**
- Secure **session token** generated using `crypto.randomBytes()`

### 📝 Meeting History (Backend Feature)
- Every meeting joined is saved
- Users can view their previous meeting records
- MongoDB database integration

### 👤 User Lobby
- Username prompt before entering call
- Lobby designed to verify audio/video permissions

### 🎨 Clean & Modern UI
- Built using **React + MUI**
- Responsive layout for desktop & mobile
- Smooth animations & transitions

### ⚙️ Additional Technical Features
- Uses **STUN servers** (`stun.l.google.com:19302`)
- Fallback silent/black stream when permissions blocked
- Auto-handling of ICE candidates
- Peer management for multiple users
- Error-safe event handling & reconnect flows

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- Vite
- Material UI
- Socket.IO Client
- WebRTC
- Custom Hooks & Context API

### **Backend**
- Node.js
- Express.js
- Socket.IO Server
- bcrypt (password hashing)
- crypto (token generation)
- MongoDB & Mongoose

### **Deployment**
- Render (Backend)
- Vercel / Render static hosting (Frontend)
- MongoDB Atlas

---

## 🔧 How WebRTC Works in This App
This project implements a complete peer connection flow:

1. User joins → frontend asks for **camera/mic permissions**
2. User connects → socket server generates or joins a room
3. WebRTC peer creation:
   - Create Offer → Emit through Socket.IO
   - Set Local Description
   - Receive Answer → Set Remote Description
4. Exchange ICE candidates
5. WebRTC establishes direct peer-to-peer stream
6. Streams appear in UI dynamically

---


