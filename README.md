# FINTRACK — FINANCE DASHBOARD

A demo finance dashboard built with Next.js, React, and Tailwind CSS. It simulates user authentication, transaction management, and role-based access (Admin / Viewer) using browser localStorage. No backend or database is required.

## TABLE OF CONTENTS

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Data Storage](#data-storage)
- [Project Structure](#project-structure)
- [Installation & Running Locally](#installation--running-locally)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Limitations & Security Note](#limitations--security-note)
- [Credits](#credits)

---

## FEATURES

- **Authentication**  
  - Sign up with name, email, password (minimum 6 characters), and role (Admin or Viewer)  
  - Login with email/password  
  - Session persistence across page refreshes (stored in localStorage)  

- **Dashboard**  
  - Summary cards: total balance, total income, total expenses  
  - Line chart: balance over time  
  - Pie chart: spending by category  
  - Transaction table with search, filter (type, category), and sorting  

- **Role‑Based Access**  
  - **Admin**: create, edit, delete transactions; export table as CSV  
  - **Viewer**: read‑only access to transactions  

- **Additional UI**  
  - Dark mode toggle  
  - Sidebar navigation, header, footer with branding  
  - Toast notifications for actions  

---

## TECH STACK

| Category       | Technology                                         |
|----------------|----------------------------------------------------|
| Framework      | Next.js (App Router)                               |
| Language       | JavaScript                                         |
| Styling        | Tailwind CSS                                       |
| Charts         | Recharts                                           |
| State Management | React Context (auth, transactions, toast)        |
| Persistence    | Browser localStorage (mock backend)                |

---

## DATA STORAGE

This application **does not have a real backend**. All data is stored locally in your browser:

- User accounts → `localStorage` (managed by `lib/auth.js`)  
- Active session → `localStorage`  
- Transactions → `localStorage` (managed by `lib/transactionsService.js`)  

A small artificial delay is added to some actions to simulate network latency.

**To reset all data:** Open DevTools → Application → Local Storage → delete keys starting with `fintrack_`, or use “Clear site data”.

---

## PROJECT STRUCTURE

```
dashboard/
├── app/
│ ├── page.js → Route guard (redirects to signup/login/dashboard)
│ ├── layout.js → Root layout, fonts, theme provider
│ ├── providers.js → Wraps app with Auth, Toast, Theme context
│ ├── globals.css
│ ├── signup/page.js
│ ├── login/page.js
│ └── dashboard/
│ ├── layout.js → Protected route, loads transaction state
│ └── page.js → Main dashboard view
├── components/ → Reusable UI (Sidebar, Header, Footer, Charts, Table, Modal, etc.)
├── context/ → AuthContext, TransactionContext, ToastContext
└── lib/
├── auth.js → Mock register/login, localStorage handlers
├── transactionsService.js → Load/save transactions, seed data
├── validators.js → Email/password validation
└── mockTransactions.js → Initial sample transactions
```

---

## INSTALLATION & RUNNING LOCALLY

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)

### Steps

1. **Navigate to the project folder**  
   ```bash
   cd dashboard
   ```

   2. **Install dependencies** 
   ```bash
   npm install
   ```

  3. **Start the development server** 
  ```bash
  npm run dev
  ```
 4. **Open the app**

 Visit http://localhost:3000 in your browser.
 
---

##  Available Scripts

### Command	Description

```bash
npm run dev	 Starts the development server with hot reload
npm run build	Creates an optimized production build
npm run start	Runs the production build locally
npm run lint	Checks code style using ESLint
```

---

##  Deployment

The app can be deployed as a standard Next.js static or server‑side site (e.g., to Vercel).
Because all data stays in each user’s own localStorage, visitors do not share a common database.

---

##  Limitations & Security Note

**No real authentication** – Passwords are stored as plain text in the browser.

**Local‑only data** – Refreshing or clearing browser storage will reset all information.

**Demo purpose onl**y – This project is intended for portfolio, learning, and interview demonstrations.
---





