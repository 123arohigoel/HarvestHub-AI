# 🌱 HarvestHub AI

> An intelligent, full-stack web platform for agricultural management, crop planning, and live farm inventory tracking.

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://harvesthub-ai-frontend-ntywxvg0w-arohi-goel.vercel.app)
[![Backend](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render)](https://harvesthub-ai.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📌 Table of Contents
- [About the Project](#-about-the-project)
- [Live Links](#-live-links)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About the Project

**HarvestHub AI** helps farmers and agricultural planners make data-driven decisions. The platform provides intuitive tools for tracking field schedules, monitoring crop growth cycles, and optimizing farm workflows through a modern Spring Boot REST API backend and a responsive web interface.

---

## 🚀 Live Links

- **Frontend Application:** [https://harvesthub-ai-frontend-ntywxvg0w-arohi-goel.vercel.app](https://harvesthub-ai-frontend-ntywxvg0w-arohi-goel.vercel.app)
- **Backend API Base URL:** [https://harvesthub-ai.onrender.com/api](https://harvesthub-ai.onrender.com/api)

> **Note:** The backend is deployed on Render's free tier. If the instance has been inactive, the initial API call may experience a cold start (~50–90 seconds) while the container boots up.

---

## ✨ Key Features

- **Live Database Inventory Synchronization:** Direct integration between the front-end dashboard and a cloud MySQL database.
- **Product & Crop CRUD Operations:** Add, view, edit, and delete farm inventory items with real-time feedback.
- **Agronomic Planning Modules:** Built-in panels for monitoring growth stages, optimal sowing windows, and thermal limits.
- **Decoupled Architecture:** Clean RESTful communication with configured CORS policies between Vercel and Render.
- **Responsive UI:** Clean, intuitive dashboard interface accessible across mobile and desktop browsers.

---

## 🛠 Tech Stack

- **Backend:** Java 17+, Spring Boot, Spring Data JPA, Hibernate, REST APIs, Maven
- **Database:** MySQL
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API, Async/Await)
- **Deployment & Cloud:** Vercel (Frontend), Render (Backend)
- **Version Control:** Git, GitHub

---

## 📁 Project Structure

```text
HarvestHub-AI/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/harvesthub/backend/
│   │   │   │   ├── controller/
│   │   │   │   ├── entity/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   └── BackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
└── README.md