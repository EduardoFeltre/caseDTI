# 🛒 DTI CASE

A simple online order system developed as part of the **DTI Internship Technical Challenge**, featuring product listing, cart management, and simulated checkout.

---

## Summary

- [About the Project](#about-the-project)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Design Decisions](#design-decisions)  
- [Project Structure](#project-structure)  
- [How to Run](#how-to-run)  
- [API Endpoints](#api-endpoints)  
- [AI Usage](#ai-usage)

---

## About the Project

This project is a Proof of Concept (POC) of a simple online ordering system.

The main objective is to demonstrate:

- Frontend and backend integration  
- RESTful API design  
- Code organization and clarity  
- Basic validation and good development practices  

The system allows users to view products, manage a cart, and complete a simulated checkout process.

---

## Features

- List all available products  
- Add product to cart  
- Remove product from cart  
- Update product quantity (minimum: 1, maximum: 10)  
- Simulated checkout  
- Cart cleared after successful checkout  

---

## Technologies Used

### Backend
- Node.js  
- Express  
- SQLite  
- CORS  

### Frontend
- React  
- Axios  

### Tools
- Visual Studio Code  
- Git & GitHub  

---

## Design Decisions

Node.js and Express were chosen for the backend due to their simplicity and flexibility when building RESTful APIs.

SQLite was selected as a lightweight, file-based database suitable for a Proof of Concept application. It requires no additional configuration and integrates easily with Node.js.

The frontend was built using React to create a simple and reactive user interface. React allows clear state management, especially for handling cart updates and API responses.

The cart is stored in memory to keep the implementation aligned with the challenge scope and focused on functionality rather than persistence complexity.

RESTful principles were followed:
- GET for retrieving data  
- POST for creating or updating data  
- DELETE for removing data  

Quantity validation (minimum 1, maximum 10) was implemented in both frontend and backend to ensure consistency.

---

## Project Structure

```
caseDTI/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── database.sqlite
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── api.js
│       └── index.js
│
├── .gitignore
└── README.md
```

---

## How to Run

### 1. Prerequisites

- Node.js (v16+ recommended)  
- npm  

---

### 2. Clone the Repository

```bash
git clone https://github.com/EduardoFeltre/caseDTI.git
cd caseDTI
```

---

### 3. Run the Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:3001
```

---

### 4. Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## API Endpoints

### Products
- `GET /api/products` → Returns all products  

### Cart
- `GET /api/cart` → Returns cart items  
- `POST /api/cart` → Add or update cart item  
- `DELETE /api/cart/:id` → Remove cart item  

### Order
- `POST /api/order` → Simulated checkout 