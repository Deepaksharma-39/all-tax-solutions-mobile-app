# All Tax Solutions Platform

A full-stack tax-services platform with:

- **Customer-facing website** (`frontend/`) for discovery and lead generation.
- **Admin dashboard** (`frontend/` under `/admin/...`) for operational management.
- **Mobile app** (`app/`) built with Expo/React Native for customer workflows.
- **Node.js + Express API** (`backend/`) with MySQL (via Sequelize) for authentication, data management, file uploads, and notifications.

---

## What this project does

This repository powers a multi-channel business workflow for tax/transport-related services. At a high level, it enables:

- User authentication and role-based access (admin/customer flows).
- Service data management (venues, banners, cars, insurance, jobs, enquiries).
- Admin-side content operations (banner/image uploads and CRUD for service entities).
- Mobile and web clients consuming the same backend APIs.
- Email notifications for enquiry events.

---

## Tech stack

## 1) Backend (`backend/`)

### Core framework
- **Node.js + Express** for REST-style APIs and middleware-driven routing.

### Data layer
- **MySQL** as the relational database.
- **Sequelize** ORM for model definitions and table sync.
- **mysql2** for connection and initial DB bootstrap.

### Security & auth
- **JWT** (`jsonwebtoken`, `express-jwt`) for token-based authentication.
- Role authorization middleware (admin-protected routes).
- Password hashing with **bcryptjs**.

### File handling
- **connect-busboy** and **fs-extra** for file uploads and storage.

### Validation & utility
- **joi** for request validation.
- **cors**, **body-parser**, **nodemailer**, **moment**, **multer** and other helper packages.

---

## 2) Web frontend (`frontend/`)

### Core UI stack
- **React 18** (Create React App setup).
- **React Router v6** for route-level navigation.

### State management
- **Redux Toolkit** + **React Redux**.

### UI / design system
- **Material UI (MUI)** + Emotion for component styling.
- Bootstrap/reactstrap and supporting UI libraries for animations, maps, sliders, toasts, and rich content.

### Dashboard behavior
- Protected admin routes under `/admin/...`.
- Admin sections for users, border services, banners, insurance, cars, and jobs.

---

## 3) Mobile app (`app/`)

### Core mobile stack
- **Expo SDK 50** + **React Native 0.73**.
- **React Navigation** (stack + bottom tabs) for app navigation.

### State & networking
- **Redux Toolkit** for app state slices (`auth`, `venue`, `banner`).
- **Axios** for API communication.
- **Async Storage** and keychain helpers for client-side persistence.

### UX / components
- Native-friendly UI libraries for tab views, calendars, OTP entry, sheets, swipe lists, loaders, and status/splash handling.

---

## How things work (architecture flow)

1. **Client apps (web + mobile)** trigger API calls for auth and business entities.
2. **Backend controllers** receive requests and delegate to service layers.
3. **Service/model layer (Sequelize)** reads/writes MySQL tables.
4. **JWT middleware** authenticates users and enforces role-based access.
5. **Admin uploads** (e.g., banners/documents) are streamed to server directories.
6. **Notification endpoint** can send enquiry email alerts using SMTP.

---

## Repository structure

```text
.
├── backend/      # Express API, Sequelize models/services/controllers, uploads
├── frontend/     # React web app + admin dashboard
├── app/          # Expo React Native mobile app
├── package.json  # Root scripts to run backend + frontend together
└── eas.json      # Expo Application Services config
```

---

## Run the project locally

> Prerequisites: Node.js 18+ (recommended), npm, and MySQL.

### 1) Install dependencies

From repository root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
npm install --prefix app
```

### 2) Configure backend DB

- Update `backend/config.json` with your local MySQL credentials.
- Ensure MySQL is running.

### 3) Start web + API together

From root:

```bash
npm run dev
```

This runs:
- backend dev server (`backend`)
- frontend dev server (`frontend`)

### 4) Start mobile app

From root:

```bash
npm run start --prefix app
```

Then open Expo on Android/iOS simulator or device.

---

## Key scripts

### Root
- `npm run dev` – start backend + frontend concurrently.
- `npm run start:backend` – run backend dev command.
- `npm run start:frontend` – run frontend dev server.

### Backend
- `npm run dev --prefix backend` – nodemon-based development run.
- `npm run start --prefix backend` – production-like Node start.

### Frontend
- `npm run start --prefix frontend` – CRA dev server.
- `npm run build --prefix frontend` – production build.

### Mobile
- `npm run start --prefix app` – Expo dev server.
- `npm run android --prefix app` / `npm run ios --prefix app`.

---

## Notes

- This repo includes both customer and admin experiences in the web app.
- Backend auto-creates/syncs DB models at startup via Sequelize.
- If you deploy publicly, move secrets/credentials from static files into environment variables.

