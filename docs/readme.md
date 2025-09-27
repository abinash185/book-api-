# 📚 Book Review API

A simple RESTful API for managing books and reviews, built with **Node.js (Express.js)**, **MongoDB**, and **JWT authentication**.

---

## 🚀 Features
- User authentication with JWT (Signup/Login)
- CRUD operations for Books and Reviews
- Pagination and filtering for books & reviews
- Search books by title/author (case-insensitive, partial match)
- One review per user per book

---

## 📂 Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/abinash185/book-api-
cd book-api-
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://abinash185:abinash185@cluster0.5xxgiv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecretkey
```

### 4️⃣ Run the Server
```bash
npm start
```
Server will run on: `http://localhost:5000`

---

## 🛠 API Endpoints

### Authentication
- **POST /signup** → Register a new user
- **POST /login** → Login and get JWT token

### Books
- **POST /books** → Add new book *(Auth required)*
- **GET /books** → Get all books (pagination + filter by author/genre)
- **GET /books/:id** → Get book details with average rating + reviews

### Reviews
- **POST /books/:id/reviews** → Add review *(Auth required, one per user per book)*
- **PUT /reviews/:id** → Update your review *(Auth required)*
- **DELETE /reviews/:id** → Delete your review *(Auth required)*

### Search
- **GET /search?query=xyz** → Search books by title or author

---

## 🧪 Example API Requests

### Signup
```bash
curl -X POST http://localhost:5000/signup \
 -H "Content-Type: application/json" \
 -d '{"username": "john", "password": "123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/login \
 -H "Content-Type: application/json" \
 -d '{"username": "john", "password": "123456"}'
```

### Add Book (with JWT)
```bash
curl -X POST http://localhost:5000/books \
 -H "Authorization: Bearer <your_token>" \
 -H "Content-Type: application/json" \
 -d '{"title": "Book Title", "author": "Author Name", "genre": "Fiction"}'
```

### Search Book
```bash
curl "http://localhost:5000/search?query=Book"
```

---

## 🗄 Database Schema

### Users
- `username`: String, unique
- `password`: String (hashed)

### Books
- `title`: String
- `author`: String
- `genre`: String
- `reviews`: [ObjectId → Review]

### Reviews
- `user`: ObjectId → User
- `book`: ObjectId → Book
- `rating`: Number (1–5)
- `comment`: String

---

## 📊 ER Diagram

### Mermaid Diagram
```mermaid
erDiagram
    USER ||--o{ REVIEW : writes
    BOOK ||--o{ REVIEW : has
    USER {
        string username
        string password
    }
    BOOK {
        string title
        string author
        string genre
    }
    REVIEW {
        int rating
        string comment
    }
```

---

## 📝 Assumptions & Design Decisions
- One review per user per book
- Passwords are hashed using **bcrypt**
- JWT is used for authentication
- MongoDB chosen for flexibility in schema

---

## This Repo is created by Abinash Kumar 😎

