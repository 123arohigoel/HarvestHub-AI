# 🌱 HarvestHub AI

> An intelligent, full-stack web platform for agricultural management, crop planning, and farm productivity tracking.

---

## 📌 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
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

## ✨ Key Features

- **Crop & Product Management:** Track inventory, field inputs, and crop lifecycles via RESTful endpoints.
- **Resource Tracking:** Manage farm schedules and field logs in a unified dashboard.
- **Responsive UI:** Clean and modern interface accessible across mobile and desktop browsers.
- **Robust Architecture:** Clean layered Spring Boot architecture (Controllers, Services, Repositories).

---

## 🛠 Tech Stack

- **Backend:** Java 17+, Spring Boot, Spring Data JPA, REST APIs, Maven
- **Database:** MySQL
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
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