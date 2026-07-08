# 🏟️ StadiumGPT – AI Stadium Assistant

> AI-powered Smart Stadium Assistant for FIFA World Cup 2026

![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Python](https://img.shields.io/badge/Python-3.11-yellow)
![Gemini](https://img.shields.io/badge/Google-Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Overview

StadiumGPT is an AI-powered stadium assistant designed for FIFA World Cup 2026.

The platform helps fans, organizers, and stadium staff through conversational AI, interactive navigation, operational dashboards, emergency assistance, and intelligent recommendations.

The application combines Generative AI with modern web technologies to deliver a smarter and more accessible stadium experience.

---

# ✨ Features

## 👤 Fan Module

- AI Stadium Chat Assistant
- Gemini AI Integration
- Stadium Navigation
- Interactive Stadium Map
- Emergency Assistance
- Multi-language Support
- Gate Information
- Restroom Finder
- Food Court Finder
- Parking Information

---

## 👨‍💼 Admin Module

- Admin Dashboard
- Crowd Monitoring
- Heatmap Visualization
- Emergency Monitoring
- Match Overview
- Weather Information
- Analytics Dashboard
- AI Recommendations
- Daily Report Generation
- PDF Export

---

# 🛠 Tech Stack

## Frontend

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Leaflet
- Recharts
- jsPDF
- Lucide Icons

---

## Backend

- FastAPI
- Python
- Gemini API
- Pydantic
- python-dotenv

---

## Data

- Local JSON
- REST APIs

---

# 📂 Project Structure

```
stadium-gpt/
│
├── frontend/
├── backend/
├── data/
├── README.md
├── LICENSE
├── .gitignore
└── .env.example
```

---

# 🚀 Installation

## Clone

```bash
git clone https://github.com/YOUR_USERNAME/stadium-gpt.git

cd stadium-gpt
```

---

## Backend

```bash
cd backend

python -m venv venv

# Windows

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create

```
backend/.env
```

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/chat | AI Chat |
| GET | /api/dashboard | Dashboard |
| GET | /api/crowd | Crowd Data |
| GET | /api/emergency | Emergency Data |
| GET | /api/weather | Weather |
| GET | /api/match | Match |
| GET | /api/report | Complete Report |

---

# 🎯 Screens

- Home
- AI Chat
- Stadium Map
- Dashboard
- Analytics
- Reports

---

# 📈 Future Scope

- Voice Assistant
- Live Crowd Detection
- QR Navigation
- IoT Integration
- CCTV AI Analytics
- Real-time Notifications

---

# 👨‍💻 Team

Hackathon Project

FIFA World Cup 2026

---

# 📄 License

MIT License

---

⭐ If you like this project, give it a star.