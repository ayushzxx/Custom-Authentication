# Authentication

This application uses **Custom JWT Authentication**.

## Authentication Flow

1. User registers with email and password.
2. Password is securely hashed before storing in MongoDB.
3. User logs in with valid credentials.
4. Server generates a JWT token.
5. Token is returned to the client.
6. Client stores the token (typically in HTTP-only cookies or local storage).
7. Protected routes verify the JWT before granting access.

---

## Required Environment Variables

```env
JWT_SECRET=your_super_secret_jwt_key
```

The `JWT_SECRET` is used to:

- Sign JWT tokens
- Verify JWT tokens
- Protect authenticated routes

Example:

```env
JWT_SECRET=myStrongSecretKey123!@#
```

---

## API Endpoints

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

---

### Get Current User

```http
GET /api/auth/me
```

Headers:

```http
Authorization: Bearer <jwt_token>
```

Response:

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### Logout User

```http
POST /api/auth/logout
```

Response:

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Password Reset via Email

The application supports password reset using Gmail SMTP.

### Flow

1. User clicks "Forgot Password".
2. A reset link/token is sent to the registered email.
3. User opens the link and enters a new password.
4. Password is updated in the database.

Required SMTP Configuration:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## Protected Routes

Routes requiring authentication should use JWT middleware.

Example:

```javascript
router.get("/profile", authMiddleware, getProfile);
```

JWT Verification Example:

```javascript
const token = req.headers.authorization?.split(" ")[1];
jwt.verify(token, process.env.JWT_SECRET);
```

---

## Security Best Practices

- Hash passwords using bcrypt.
- Use strong JWT secrets.
- Set token expiration times.
- Use HTTPS in production.
- Store sensitive data in environment variables.
- Never expose JWT secrets publicly.
