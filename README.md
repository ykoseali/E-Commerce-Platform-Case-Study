
# 🛍️ E-Commerce Platform Case Study

A full-stack e-commerce platform built using **Next.js**, **TypeScript**, **MongoDB**, and modern development best practices. This project simulates a production-grade e-commerce solution, showcasing a thoughtful and modular design that prioritizes user experience, scalability, and clean architecture — while acknowledging the scope limitations of a professional case study assignment.

---

## ✨ Features Overview

### 🛒 Customer Storefront (`/frontend`)

- ✅ User registration & login (NextAuth + bcrypt)
- ✅ Product browsing & search by category
- ✅ Product detail pages with image gallery
- ✅ Add to cart, manage quantities, simulated checkout
- ✅ Recently viewed products
- ✅ Responsive design (mobile + desktop)
- ✅ Related product suggestions
- ⚠️ Popular products displayed (UI only)

### 🧑‍💼 Admin Panel (`/admin`)

- ✅ Admin login & session protection
- ✅ Product management (create, edit, delete, images)
- ✅ Category management
- ✅ Order management with filters & detail view
- ✅ Customer list with order history
- ✅ Dashboard stats & charts (UI only for analytics)
- ⚠️ Analytics and trending product metrics shown as placeholders

---

## 📌 Note on Feature Scope

This project was developed as part of a **software engineering case study** and not as a full production application. Due to the limited time frame and the nature of the task, some components — such as the **"Popular Products"** section and parts of the **Admin Dashboard analytics** — are included as **visual placeholders** to demonstrate the UI/UX intent of a complete e-commerce system.

These elements reflect the architectural design and front-end experience of a full implementation. While not fully functional, they showcase thoughtful planning, modularity, and interface polish — aligning with the expectations of a case study while prioritizing core features.

---

## 🧱 Tech Stack

| Layer        | Technology                      |
|--------------|----------------------------------|
| Frontend     | Next.js 15, TypeScript           |
| Backend      | Next.js API Routes               |
| Styling      | Tailwind CSS                     |
| State Mgmt   | React Context API                |
| Database     | MongoDB + Mongoose               |
| Authentication | NextAuth.js + JWT + bcrypt     |
| Validation   | Zod + React Hook Form            |
| Charts       | Chart.js + react-chartjs-2       |
| File Upload  | Multer (ready for Cloudinary)    |

---

## 🗂️ Project Structure

```
ecommerce-case-study/
├── frontend/      # Public-facing storefront (port 3001)
└── admin/         # Admin dashboard (port 3000)
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
cd frontend
npm install

cd ../admin
npm install
```

### 2. Setup environment variables

Create `.env.local` in both `frontend/` and `admin/`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:PORT
```

> Use port 3000 for admin, 3001 for frontend.

### 3. Seed the database

```bash
cd admin
npx tsx scripts/seedAdmin.ts
npx tsx scripts/seedFakeOrders.ts
```

### 4. Run the apps

```bash
cd frontend
npm run dev  # http://localhost:3001

cd ../admin
npm run dev  # http://localhost:3000
```

---

## 🧪 Demo Accounts

| Role    | Email              | Password  |
|---------|--------------------|-----------|
| Admin   | admin@example.com  | admin123  |
| Customer | Register via UI   | —         |

---

## 📑 API Endpoints (Sample)

| Method | Endpoint                 | Description                   |
|--------|--------------------------|-------------------------------|
| POST   | `/api/auth/login`        | Login user                    |
| GET    | `/api/products`          | List all products             |
| POST   | `/api/orders`            | Submit order                  |
| GET    | `/api/user/profile`      | Get current user              |

---

## 🚀 Deployment Notes

You can deploy `frontend/` and `admin/` independently on Vercel, Render, or any Node hosting provider.

- Separate subdomains or routes recommended
- Use environment variables per environment
- MongoDB Atlas preferred for cloud database

---

## ✅ Implemented Requirements

- [x] Frontend in Next.js 14+ (App Router, TypeScript)
- [x] Tailwind CSS styling + responsive design
- [x] Authentication with JWT + bcrypt
- [x] Admin dashboard and product/order/category/customer management
- [x] Recommendation logic: Related + recently viewed
- [x] Visual mockups for advanced features

---

## 📚 License

This project is created for educational and portfolio purposes as part of a software engineering case study.

