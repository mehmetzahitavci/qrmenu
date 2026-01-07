#  QR Menu & Order Management System

> **Final Project Submission** > **Course:** Web Design and Programming  
> **Student:** Mehmet Zahit Avcı

A comprehensive, full-stack web application designed to digitize the restaurant ordering process. Customers can scan a QR code, browse a dynamic menu, filter items by category, and place orders instantly without waiter intervention.

---

##  Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [Installation & Setup Guide](#-installation--setup-guide)
  - [1. Database Setup](#1-database-setup)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [API Documentation](#-api-endpoints)
- [Screenshots](#-screenshots)

---

##  Features

###  User Experience (Frontend)
* **Responsive Design:** Optimized for both mobile devices (Tab navigation) and desktops (Sidebar navigation).
* **Dynamic Filtering:** URL-based routing (e.g., `/menu/coffee`) allows users to share specific category links.
* **Real-time Search:** Instant search functionality across product names and descriptions (supports Turkish characters).
* **Global Cart Management:** Built with **React Context API** to manage state across the entire application without prop-drilling.
* **Interactive UI:** Uses Material UI components (Modals, Snackbars, Drawers) for a polished look.

###  Backend Capabilities
* **RESTful API:** Exposes endpoints for fetching products, categories, and featured items.
* **Data Transfer Objects (DTO):** Implements DTO pattern to decouple the internal database entities from the API response.
* **Exception Handling:** Robust error handling for "Product Not Found" or database connection issues.
* **CORS Configuration:** Fully configured to allow requests from the React frontend.

---

##  Technology Stack

| Area | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Main UI Framework (SPA) |
| | **Material UI (MUI)** | Component Library & Theming |
| | **React Router DOM** | Navigation & URL Management |
| | **Context API** | State Management (Cart, User, Theme) |
| **Backend** | **Java 17** | Core Programming Language |
| | **Spring Boot** | Backend Framework |
| | **Spring Data JPA** | ORM / Database Interaction |
| | **Maven** | Dependency Management |
| **Database** | **PostgreSQL** | Relational Database |

---

##  Folder Structure

The project follows a strict separation of concerns:

```text
QrMenuFinalProject/
├── SourceCode/
│   ├── frontend/             # React Application (Client-Side)
│   │   ├── public/           # Static Assets (Images, Icons)
│   │   └── src/
│   │       ├── components/   # Reusable UI Components
│   │       ├── context/      # Global State (CartContext)
│   │       ├── pages/        # Main Views (MenuPage, AdminPage)
│   │       └── services/     # API Service Calls
│   ├── backend/              # Spring Boot Application (Server-Side)
│   │   ├── src/main/java/    # Controllers, Models, Repositories
│   │   └── src/main/resources/# Application Properties
│   └── database/             # Database Setup Scripts
│       ├── createTable.sql   # Schema definitions
│       └── data.sql          # Initial dummy data
├── WebReport.docx            # Final Project Report
└── README.md                 # Project Documentation

## Requirements

- Node.js (v18+)
- npm or yarn

## Installation

1. Navigate to the project directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000).



## Backend Connection

The frontend connects to a Spring Boot-based backend API. Make sure the backend is running at `http://localhost:8080` by default.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds for production with optimizations |

## Notes

- This project was bootstrapped with [Create React App](https://create-react-app.dev/).
- It is recommended to run the backend project with IntelliJ IDEA.