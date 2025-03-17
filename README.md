# ToDo App (Serverless + React Native + Redux)

This repository contains a simple ToDo application demonstrating a **CRUD API** (using **Node.js + TypeScript + Serverless**) and a **React Native** frontend (written in TypeScript) that consumes the API and uses **Redux** for state management.

---

## Contents

- [ToDo App (Serverless + React Native + Redux)](#todo-app-serverless--react-native--redux)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Usage](#usage)
    - [Testing](#testing)
  - [Backend Tests](#backend-tests)
  - [Frontend Tests](#frontend-tests)
    - [Additional Notes \& Bonus Topics](#additional-notes--bonus-topics)
  - [Data Storage](#data-storage)
  - [Code Linting](#code-linting)

---

## Overview

**Goal**  
- Show a minimal demonstration of a **Serverless + TypeScript** backend with a **React Native + Redux** frontend for a basic ToDo list.

**Highlights**  
- **CRUD API** for listing, creating, updating, and deleting todos.  
- **React Native** mobile app that calls these API endpoints.  
- **Redux Toolkit** for state management on the frontend.  

---

## Tech Stack

**Backend (server)**  
- Node.js + TypeScript  
- AWS Lambda + Serverless Framework  
- Jest (testing)  
- ESLint (linting)  

**Frontend (mobile)**  
- React Native (TypeScript)  
- Redux Toolkit / React-Redux  
- Axios (for HTTP requests)  

---

## Project Structure

.
├── server
│   ├── package.json
│   ├── serverless.yml
│   ├── tsconfig.json
│   ├── webpack.config.js (optional)
│   ├── src
│   │   ├── handlers
│   │   │   └── todos.ts
│   │   └── __tests__
│   │       └── todos.test.ts
│   └── README.md (optionally separate)
└── mobile
    ├── package.json
    ├── tsconfig.json
    ├── App.tsx
    ├── store
    │   ├── index.ts
    │   └── todosSlice.ts
    ├── babel.config.js
    ├── jest.config.js (optional)
    └── README.md (optionally separate)

## Getting Started

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
2. **Build the Typescript**
   ```bash
   npm run build
This compiles the .ts files into the dist/ folder.

3. **Run Locally**
   ```bash
   npm run serve
* This uses serverless-offline, which spins up your app at http://localhost:3000.
* Test endpoints like GET /todos, POST /todos, PUT /todos/{id}, DELETE /todos/{id}.

4. **Test the Endpoints**
   * Use Postman, curl, or a browser extension to confirm functionality.
  
### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd mobile
   npm install
2. **Configure API Base URL**
   * In store/todosSlice.ts (inside mobile), set the API_BASE_URL to match your backend URL.
   * For local development:
     ```bash
     const API_BASE_URL = 'http://localhost:3000';
   * If using a device (not simulator), replace localhost with your computer’s LAN IP or use the deployed backend URL.
3. **Start the Mobile App**
   ```bash
   npx expo start
* Press `a` to launch Android emulator or `w` for web.

### Usage
1. Launch the backend
   ```bash
   cd server
   npm run serve
2. Launch the frontend
   ```bash
   cd mobile
   npx expo start
3. Add and manage ToDos
   * The ToDo list is fetched from `/todos`.
   * You can add, complete (toggle), and delete todos.

### Testing
## Backend Tests
   * In `server`, run:
     ```bash
     npm run test
   * This executes any Jest tests under `src/__tests__/`.
## Frontend Tests
   * In `mobile`, you can set up Jest or React Native Testing Library:
     ```bash
     npm run test

### Additional Notes & Bonus Topics
## Data Storage
   * Currently uses an in-memory array; for production, use DynamoDB or another database.
  
## Code Linting
<<<<<<< HEAD
   * Run npm run lint in both folders to catch style or syntax issues.
=======
   * Run `npm run lint` in both folders to catch style or syntax issues.

>>>>>>> 4020c845cdeebc26493c69ab4b6f496b1ac47e46
