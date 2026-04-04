# FinTrack — Finance Dashboard

## In one sentence

**FinTrack is a practice finance website** where you can sign up, log in, and explore balances, charts, and transactions — **all saved in your browser** (no real server).

---

## Who is this for?

- Students and **interns** building a portfolio piece  
- Anyone learning **Next.js**, **React**, and **Tailwind**  
- Interview prep: you can explain auth flow, roles, charts, and state clearly  

---

## What does this app do?

Imagine a tiny version of a banking or budgeting site:

1. **Create an account** (Sign up) with your name, email, password, and role.  
2. **Log in** with email and password.  
3. See a **dashboard** with numbers and graphs.  
4. **Browse transactions** — search, filter, sort.  
5. If you are **Admin**, you can **add, edit, or delete** transactions and **download CSV**.  
6. If you are **Viewer**, you only **look** — no editing.  
7. **Log out** from the sidebar when you are done.

Your login **stays** after you refresh the page until you log out.

---

## Simple flow (first visit)

```
Open app
    │
    ├─► No accounts yet? ──► Sign up ──► Login ──► Dashboard
    │
    ├─► Accounts exist, not logged in? ──► Login ──► Dashboard
    │
    └─► Already logged in? ──► Dashboard
```

---

## Feature list (easy scan)

| Feature | Description |
|--------|-------------|
| Sign up | Name, email, password (6+ chars), role: Admin or Viewer |
| Login | Email + password; shows errors if wrong |
| Session | Stored in browser; survives refresh |
| Dashboard cards | Total balance, income, expenses |
| Charts | Line = balance over time; Pie = spending by category |
| Transactions table | Search, filter by type & category, sort |
| Admin tools | Modal to add/edit; delete button; CSV export |
| Insights | Short text tips (top category, month comparison, etc.) |
| Dark mode | Toggle in the top bar |
| Layout | Sidebar, header, footer (FinTrack branding) |

---

## Tech stack (what it’s built with)

| Piece | Technology |
|-------|------------|
| Framework | **Next.js** (App Router) |
| Language | **JavaScript**  |
| UI | **Tailwind CSS** |
| Charts | **Recharts** |
| Global state | **React Context** (auth, transactions, toast) |

---

## How is data stored? (read this once)

**There is no backend.** The app does not send your data to a company server.

| What | Where it lives |
|------|----------------|
| User accounts | Browser **localStorage** (via `lib/auth.js`) |
| Who is logged in | Same — session key in **localStorage** |
| Transactions | **localStorage** (via `lib/transactionsService.js`) |

To make it feel like a real app, some actions wait a **short fake delay** (like a slow API).

**Security note:** Passwords are stored **as plain text** in the browser. That is **only OK for demos**. Real apps must use a server and proper security.

**Reset everything:** In the browser, open DevTools → Application → Local Storage → delete keys starting with `fintrack_`, or “Clear site data”.

---

## Run the project (step by step)

### 1. Install Node.js

Download the **LTS** version from [nodejs.org](https://nodejs.org/) if you don’t have it.

### 2. Open the project folder

```bash
cd dashboard
```

### 3. Install packages

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
```

### 5. Open in the browser

Go to **http://localhost:3000** (check the terminal if the port is different).

---

## Useful commands

| Command | What it does |
|---------|----------------|
| `npm run dev` | Run app while you code (auto-refresh) |
| `npm run build` | Create production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Check code style with ESLint |

---

## Folder map (where to look in the code)

```
dashboard/
├── app/
│   ├── page.js                 → Sends you to signup / login / dashboard
│   ├── layout.js               → Root HTML + fonts
│   ├── providers.js            → Wraps app with Auth + Toast + theme
│   ├── globals.css             
│   ├── signup/page.js          
│   ├── login/page.js           
│   └── dashboard/
│       ├── layout.js           → Protects route + loads transaction state + layout shell
│       └── page.js             → Main dashboard 
├── components/                 → Sidebar, header, footer, charts, table, modal, …
├── context/                    → AuthContext, TransactionContext, ToastContext
└── lib/
    ├── auth.js                 → Fake register/login + localStorage
    ├── transactionsService.js  → Load/save transactions + seed data
    ├── validators.js           → Email/password checks for forms
    └── mockTransactions.js     → Sample rows for first run
```

---

## Deploying (e.g. Vercel)

You can host this like a normal Next.js site.  
Each person’s **data stays on their own device** — visitors do **not** share one database.

---

## Credits & honesty for interviews

Say clearly: *“It’s a frontend demo: auth and data use localStorage and simulated delays, not a real API or database.”*  
That shows you understand limits and keeps expectations realistic.

---

Enjoy building and explaining FinTrack.
