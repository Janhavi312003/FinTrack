/**
 * Mock auth API — users + session in localStorage, delayed responses.
 * Demo only; not secure for production.
 */

const USERS_KEY = "fintrack_users";
const SESSION_KEY = "fintrack_session";

const DEFAULT_DELAY_MS = 450;

function delay(ms = DEFAULT_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readUsers() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function hasAnyUsers() {
  return readUsers().length > 0;
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** @returns {{ ok: true } | { ok: false, error: string }} */
export async function registerUser({ name, email, password, role }) {
  await delay();
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  const user = {
    id: `u_${Date.now()}`,
    name: name.trim(),
    email: normalized,
    password,
    role: role === "admin" ? "admin" : "viewer",
  };
  users.push(user);
  writeUsers(users);
  return { ok: true };
}

/** @returns {{ ok: true, user: object } | { ok: false, error: string }} */
export async function loginUser({ email, password }) {
  await delay();
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  const found = users.find((u) => u.email === normalized);
  if (!found || found.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }
  const session = {
    id: found.id,
    name: found.name,
    email: found.email,
    role: found.role,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: session };
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
