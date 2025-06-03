# 🏠 Smart Room Dashboard

**Smart Room Dashboard** is a clean, real-time React-based web interface that displays environmental data and offers home security and planning tools — all from your local setup.

---

## 🌟 Features

- **🌡️ Live Temperature & Humidity**  
  Real-time values from an **ESP32** sensor device.

- **🗓️ Planner Calendar**  
  A user-friendly interface for tracking events, tasks, and reminders.

- **📊 Historical Graphs**  
  Visualize trends in room conditions over time with responsive bar graphs (via InfluxDB).

- **📡 Real-Time Camera Stream**  
  Secure, low-latency home monitoring using an **Nginx-compiled stream**.

- **⚡ Fast Frontend**  
  Built with **Vite** and **React** for blazing-fast performance.

---

## 🧠 Architecture Overview

Here’s how all components work together:

               ┌────────────┐
               │  ESP32     │
               │ (Sensor)   │
               └────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Python API      │◄──┐
          │ (Flask/FastAPI) │   │  Dockerized
          └──────┬──────────┘   │
                 │              │
                 ▼              │
          ┌─────────────┐       │
          │ InfluxDB    │◄──────┘
          └─────────────┘

               ▲
               │
    ┌──────────┴──────────┐
    │ React + Vite Frontend│
    └──────────┬──────────┘
               │
               ▼
        ┌──────────────┐
        │   Nginx RTMP │ (Camera Stream)
        └──────────────┘


> All backend services (API, InfluxDB, Nginx streaming) run inside **Docker containers** for easy setup and scalability.

---

## 🛠️ Tech Stack

| Layer        | Technology                |
|--------------|---------------------------|
| **Device**   | ESP32 (sensor module)     |
| **Frontend** | React + Vite              |
| **Backend**  | Python (Flask or FastAPI) |
| **Database** | InfluxDB (time-series DB) |
| **Streaming**| Nginx + RTMP/HLS module   |
| **Containerization** | Docker + Docker Compose |

---

