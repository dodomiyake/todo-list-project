# ToDo App (Serverless + React Native + Redux)

This repository contains a simple ToDo application demonstrating a **CRUD API** (using **Node.js + TypeScript + Serverless**) and a **React Native** frontend (written in TypeScript) that consumes the API and uses **Redux** for state management.

---

## Contents

1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Getting Started](#getting-started)  
   - [Backend Setup](#backend-setup)  
   - [Frontend Setup](#frontend-setup)  
5. [Usage](#usage)  
6. [Testing](#testing)  
7. [Deployment](#deployment)  
8. [Additional Notes & Bonus Topics](#additional-notes--bonus-topics)  

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
   npm run build
This compiles the .ts files into the dist/ folder.
