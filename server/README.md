# Uthsonova Blog Backend

A complete, production-ready RESTful API backend for the Uthsonova Blog built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login using JWT and bcryptjs.
- **Blog Management**: Full CRUD operations for blog posts (Draft/Published status).
- **Admin Roles**: Protected routes for modifying blog visibility and status.
- **Data Validation**: Request payloads validated seamlessly using `express-validator`.
- **Centralized Error Handling**: Prevents silent crashes, mapping errors to clean JSON responses.
- **API Documentation**: Interactive Swagger UI built directly from JSDoc comments.
- **Security**: Hardened with Helmet, CORS configured for credentials, and environment-driven secrets.

## Tech Stack

- **Node.js** (ES Modules)
- **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (jsonwebtoken)
- **bcryptjs** (Password hashing)
- **express-validator**
- **Helmet** & **CORS**
- **Morgan** (Logging)
- **Swagger JSDoc** & **Swagger UI Express**

## Project Structure

```text
server/
├── src/
│   ├── config/
│   │   ├── cors.js
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── adminBlogController.js
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── validate.js
│   ├── models/
│   │   ├── blog.js
│   │   └── user.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── index.js
│   ├── services/
│   │   └── authService.js
│   ├── utils/
│   │   ├── AppError.js
│   │   └── catchAsync.js
│   └── validators/
│       ├── Register_validation.js
│       └── blog_validation.js
├── .env
├── .env.example
├── app.js
├── server.js
├── swagger.js
└── package.json
```

## Installation

1. **Clone and enter the directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root of the `server/` directory based on `.env.example`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/uthsonova_blog
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
```

> **Warning**: Never commit your `.env` file to version control.

## Running the Server

Start the development server with auto-reloading:
```bash
npm run dev
```

Start the production server:
```bash
npm start
```

## API Documentation

When the server is running, visit **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)** to view and test all endpoints interactively.

### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST   | `/api/auth/register` | No | Register a new user |
| POST   | `/api/auth/login` | No | Login and receive JWT |
| GET    | `/api/auth/me` | Yes | Get the authenticated user's profile |

### Blog Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET    | `/api/blogs` | No | Get all published blogs |
| GET    | `/api/blogs/:id` | No | Get a specific blog |
| POST   | `/api/blogs` | Yes | Create a new blog |
| PUT    | `/api/blogs/:id` | Yes | Update your own blog |
| DELETE | `/api/blogs/:id` | Yes | Delete your own blog |

### Admin Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PATCH  | `/api/admin/blogs/:id/status` | Yes | Toggle blog status (Draft/Published) |

## Authentication Flow

1. **Registration/Login**: Client sends credentials, server validates against MongoDB, compares bcrypt hashes, and returns a signed JSON Web Token (JWT).
2. **Protected Routes**: Client sends the token in the `Authorization: Bearer <token>` header. The `protect` middleware intercepts, validates the token, and attaches the decoded `req.user` payload for downstream controllers to use.

## Error Handling

All asynchronous controllers are wrapped in a `catchAsync` utility. Any thrown errors (like `new AppError('Message', 404)`) automatically bypass the normal flow and hit the global `errorHandler` middleware. This centralized handler normalizes the response into a consistent `{ success: false, message: "..." }` format and provides stack traces only during development.

## Future Improvements

- **Rate Limiting**: Add `express-rate-limit` to authentication routes to prevent brute-force attacks.
- **Pagination**: Introduce skip/limit query parameters on the `GET /api/blogs` route.
- **Role-Based Access Control (RBAC)**: Expand the User model with a `role` enum (e.g., `user`, `admin`) to strictly govern the `/api/admin/*` endpoints.
