# Mini LinkedIn 🧑‍💼

A simplified LinkedIn-style social platform where users can register, log in, create posts, and view posts from other users.

---

## 🌐 Live Demo

[Live Demo](https://mini-linkedin-eosin.vercel.app)

## 📂 GitHub Repository

[GitHub Repo](https://github.com/Negiditya/mini-linkedin)

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cookie-Parser
- JWT
- Bcrypt

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Negiditya/mini-linkedin.git
cd mini-linkedin
```

### 2. Set up the backend:

```bash
cd backend
npm install
```

- Create a `.env` file inside the `backend` folder with the following:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

> 📝 **Example MongoDB URI:**  
> `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<your-db-name>?retryWrites=true&w=majority`

> A `.env.example` file is included for reference.

- 📌 **To get a MongoDB URI**:  
  Create a free account on MongoDB Atlas, set up a cluster, and create a database. Then, copy the connection URI, replace <password> with your database user’s password, and specify your database name before the ? in the URI.

### 3. Start the backend server

```bash
node server.js
```

By default, the backend runs on `http://localhost:5000`.

### 4. Set up the frontend:

```bash
cd ../frontend
npm install
```

### 5. Start the frontend:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

> Axios is configured to use `http://localhost:5000` when no environment variable is provided.

> CORS is set up in the backend to allow requests from both local (`localhost:5173`) and production (`mini-linkedin-eosin.vercel.app`).

---

## 👤 Demo

You can register using any email, username, and password. After registration, log in with the same credentials to create and view posts.

---

## 🧪 Extra Features

- Persistent login with HTTP-only cookies
- Protected routes
- Users can update their bio
- Responsive UI with Tailwind CSS



