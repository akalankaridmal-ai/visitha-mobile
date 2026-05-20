# Visitha Mobile - Full Stack MERN E-Commerce Platform 📱🛒

A robust, minimalistic full-stack e-commerce application custom-built for **Visitha Mobile (Sri Lanka)** to manage smartphone inventory, provide seamless customer browsing, handle user sessions, and manage orders. Built natively using the **MERN (MongoDB, Express.js, React, Node.js)** architecture.

## 🚀 Key Features

### 🌟 Customer Experience
* **Global Search Bar:** Instant product keyword queries leveraging MongoDB `$or` Regex matching patterns.
* **Smart Filtering:** Dynamic categorization filtering based on hardware condition (Brand New / Used).
* **Minimalistic Showcase UI:** Beautiful, columned device specification pages with responsive image rendering and accurate pricing formats.
* **Persistent Shopping Cart:** Fully managed client-side basket context state that retains items across page reloads.
* **Simulated Checkout Flow:** Native Cash on Delivery routing configuration with integrated loading state notifications.

### 🛡️ Secure Authentication
* Built-in client registration and login controllers using secure hashed passwords (**Bcrypt**).
* Secure JSON Web Token (**JWT**) user tracking for protected route verification.

### ⚙️ Admin Inventory Dashboard
* Complete administrative layout including an inventory data visualization panel.
* Multi-part product creation form built to handle image uploads and text processing via `FormData` and `express-formidable`.

---

## 🛠️ Tech Stack Matrix

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js (Vite), Context API state containers, React Router, Bootstrap 5, Axios, React Hot Toast |
| **Backend** | Node.js, Express.js REST APIs, express-formidable binary parsers |
| **Database** | MongoDB Atlas cloud clustering, Mongoose ODM |
| **Security** | JWT (JSON Web Tokens), Bcrypt encryption helpers |

---

## 🏁 Installation & Local Startup

### 1. Backend Server Setup
```bash
cd server
npm install
