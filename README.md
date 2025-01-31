# Express + Prisma Authentication API

This project is a simple authentication API built with Express, Prisma, and JWT authentication. It includes user registration, login, and a protected dashboard route. API documentation is provided using Redoc.

## 📌 Features
- **User Registration** (`/register`)
- **User Login** (`/login`)
- **Protected Dashboard Route** (`/dashboard`)
- **JWT Authentication**
- **API Documentation** (`/docs`)

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/) (optional, for database)

### 2️⃣ Installation
Clone the repository and install dependencies:
```sh
npm install
```

### 3️⃣ Database Setup
This API uses Prisma with SQLite by default. You can configure it for PostgreSQL, MySQL, etc.

#### Initialize Prisma
```sh
npx prisma generate
```

#### Run Database Migrations
```sh
npx prisma migrate dev --name init
```

### 4️⃣ Start the Server
```sh
npm start
```

The API will be available at: `http://localhost:3000`

## 📖 API Documentation
Once the server is running, you can access API documentation at:
- **Redoc UI**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **OpenAPI Spec**: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

## 🛠 Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./prisma/dev.db"
SECRET_KEY="your-very-secret-key"
```

## 📌 API Endpoints

### 🔹 Register a new user and get a JWT
**POST** `/register`
#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
#### Response:
```json
{
  "token": "your-jwt-token"
}
```

### 🔹 Login and get a JWT
**POST** `/login`
#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
#### Response:
```json
{
  "token": "your-jwt-token"
}
```

### 🔹 Access the Dashboard (Protected)
**GET** `/dashboard`
#### Headers:
```json
{
  "Authorization": "Bearer your-jwt-token"
}
```
#### Response:
```json
{
  "email": "user@example.com"
}
```

## 🛠 Development
To run in development mode with automatic reloading:
```sh
npm run dev
```