# Project Setup Guide

## Prerequisites

Before running the application, make sure you have installed:

- Node.js (v18+ recommended)
- MongoDB
- npm or yarn

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Frontend Application URL
FRONTEND_URL=http://localhost:5173

# Backend Server URL
BACKEND_URL=http://localhost:3000

# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key for Authentication
JWT_SECRET=your_jwt_secret_key

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Environment
NODE_ENV=development
```

---

## Variable Description

| Variable | Description |
|-----------|-------------|
| `FRONTEND_URL` | URL where the frontend application is running |
| `BACKEND_URL` | URL where the backend API server is running |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT token generation and validation |
| `EMAIL_HOST` | SMTP host for sending emails |
| `EMAIL_PORT` | SMTP port number |
| `EMAIL_USER` | Email address used for sending emails |
| `EMAIL_PASS` | Email password or App Password |
| `NODE_ENV` | Application environment (`development`, `production`, `test`) |

---

## Gmail SMTP Setup

If you're using Gmail:

1. Enable **2-Step Verification** on your Google account.
2. Generate an **App Password**:
   - Go to Google Account Settings.
   - Navigate to **Security** → **App Passwords**.
   - Create a new App Password.
3. Use the generated password as `EMAIL_PASS`.

Example:

```env
EMAIL_USER=myproject@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

---

## Installation

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

## Run the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## MongoDB Example

Local MongoDB:

```env
MONGO_URI=mongodb://localhost:27017/my_database
```

MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

---

## Security Notes

- Never commit your `.env` file to GitHub.
- Keep `JWT_SECRET` secure and unpredictable.
- Use App Passwords instead of your Gmail account password.
- Add `.env` to `.gitignore`.

Example:

```gitignore
.env
```

---

## Default Local URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
