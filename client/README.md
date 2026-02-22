# 🌐 Sentinel Grid - Portfolio Configuration Guide

Welcome to the ultimate cyberpunk developer portfolio! This guide will explain exactly how to configure the database and customize the content to make this portfolio your own.

---

## 1. 📂 File Structure Overview
- `/client`: The React + Vite frontend. Where all the 3D graphics, styling, and UI components live.
- `/server`: The Node.js + Express backend. Handles the Database (MongoDB) and Admin API.

---

## 2. 🗄️ Database Configuration (MongoDB)

Currently, your backend is running on a local MongoDB database (`mongodb://127.0.0.1:27017/sentinel_grid`). To put this on the internet, you need a cloud database.

### How to connect Cloud MongoDB:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account + cluster.
2. Get your connection string (it will look like `mongodb+srv://<username>:<password>@cluster0...`).
3. Open the `server/.env` file in this project.
4. Replace the `MONGO_URI` value with your Atlas connection string.
5. **Important**: When you deploy the `/server` folder to Render or Heroku, make sure you add `MONGO_URI` in their respective "Environment Variables" dashboard!

---

## 3. 🎨 Customizing the Content

Because this portfolio uses an advanced 3D pipeline, a lot of the styling is driven by React Code rather than a CMS. You can quickly edit your info in the following files:

### **Identity Details (About Me)**
Open `client/src/components/AboutSection.jsx`.
- You can change your Name, Bio, text descriptions, and "Status" lines directly in the HTML blocks returning from the component.

### **The 3D Projects Grid**
The floating 3D nodes are automatically fetching your GitHub projects!
- Open `client/src/components/HeroHub.jsx` and go to **Line 26**.
- Change `'https://api.github.com/users/sanket200511/repos'` to your own GitHub username.
- **Custom Descriptions**: If your GitHub project doesn't have a description, I added a fallback map on **Line 46** of `HeroHub.jsx`. You can easily add more custom descriptions by adding `else if (nameLower.includes('your-app-name')) customDesc = 'Your cool description...';`

### **Contact Section**
Open `client/src/components/ContactSection.jsx`.
- Update the `href` links for GitHub, LinkedIn, Twitter, and Email to point to your real profiles.

---

## 4. 🔑 Admin Dashboard Passwords

The Admin `/override` Dashboard allows you to manually inject Projects and Skills into the database.
- Go to `server/.env`.
- Change `ADMIN_USER` to your desired username.
- For maximum security, the password is a `bcrypt` hash. If you ever deploy this, do not leave the password as the default. You can generate a new bcrypt hash online or in Javascript for `ADMIN_PASS_HASH`.

---

## 5. 🚀 Deployment Quick-Start

1. **Frontend**: Push your code to GitHub, log into Vercel, and import the repository pointing the Root Directory to `client`.
2. **Backend**: Push your code to GitHub, log into Render, spin up a new Web Service using the `/server` folder, set the Build Command to `npm install`, and the Start Command to `npm start`. Set the `MONGO_URI` env variable.
3. Make sure to update the `VITE_API_URL` variable on Vercel to point to your new Render Cloud URL so React knows where the backend lives!
