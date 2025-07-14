# 🎬 Movie Recommendation App — 3MTT Final Capstone Project

This is the final project for the **3MTT Fullstack Developer Track**.  
It is a **full-featured movie recommendation web application** built with:

- 🧠 **React.js** (Frontend)
- 🚀 **Express.js** (Backend)
- 🗄️ **MongoDB** (Database)
- 🌐 **TMDB API** (External movie data)
- 🛡 **JWT Authentication**
- 🎨 **Tailwind CSS** for styling

---

## 🌟 Project Summary

Users can:

- Register & login securely
- Discover and search movies
- View detailed movie information
- Save favorite movies
- Create and manage custom watchlists
- Leave reviews and ratings
- Get personalized movie recommendations

---

## 🔐 Authentication

### Auth Routes (`/api/auth`)

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register new user   |
| POST   | `/login`    | Login existing user |

Authentication is handled with **JWT tokens** stored on the frontend.

---

## 🎬 Movie Routes

### Movie Search & Details (`/api/movies`)

| Method | Endpoint  | Description                               |
| ------ | --------- | ----------------------------------------- |
| GET    | `/search` | Search movies by title, genre, year, etc. |
| GET    | `/:id`    | Get full movie details by TMDB ID         |

These routes fetch data from **TMDB API** (server-side) and return to the client.

---

## 💖 Favorites

### Favorite Routes (`/api/user/favorites`)

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| POST   | `/`         | Save a movie to favorites     |
| GET    | `/`         | Get user's favorite movies    |
| DELETE | `/:movieId` | Remove a movie from favorites |

---

## 📁 Watchlists

### Watchlist Routes (`/api/user/watchlists`)

| Method | Endpoint      | Description                  |
| ------ | ------------- | ---------------------------- |
| POST   | `/`           | Create a new watchlist       |
| GET    | `/`           | Get all user watchlists      |
| POST   | `/:id/add`    | Add movie to a specific list |
| POST   | `/:id/remove` | Remove movie from a list     |
| DELETE | `/:id`        | Delete a watchlist           |

---

## 🌟 Ratings & Reviews

### Review Routes (`/api/reviews`)

| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| POST   | `/:movieId` | Submit or update review     |
| GET    | `/:movieId` | Get all reviews for a movie |
| DELETE | `/:movieId` | Delete user's review        |

---

## 🧑‍🎓 Pages (Frontend)

| Route         | Page Name    | Access  | Description                                |
| ------------- | ------------ | ------- | ------------------------------------------ |
| `/register`   | Register     | Public  | Create an account                          |
| `/login`      | Login        | Public  | Login to your account                      |
| `/dashboard`  | Dashboard    | Private | Overview for logged-in user                |
| `/search`     | Search       | Private | Search & discover movies                   |
| `/movie/:id`  | Movie Detail | Private | View detailed info, trailer, reviews, etc. |
| `/favorites`  | Favorites    | Private | List of all saved movies                   |
| `/watchlists` | Watchlists   | Private | Manage multiple custom movie lists         |

---

## 🧱 Tech Stack

- **Frontend:** React.js, Axios, Tailwind CSS, React Router DOM
- **Backend:** Express.js, Mongoose, JWT, Bcrypt
- **Database:** MongoDB (Cloud - MongoDB Atlas)
- **External API:** [TMDB API](https://www.themoviedb.org/documentation/api)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ✨ Stretch Features (Optional)

| Feature                  | Description                               |
| ------------------------ | ----------------------------------------- |
| 🧑‍🤝‍🧑 Social Sharing        | Follow other users, share watchlists      |
| 🎞 Trailers               | Embedded movie trailers via TMDB videos   |
| 🤖 Smart Recommendations | Personalized based on liked genres/movies |
| 📱 PWA Support           | Installable app, offline support          |

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/movie-app-3mtt.git
cd movie-app-3mtt
```
