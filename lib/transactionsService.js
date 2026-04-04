/**
 * Mock transactions API — localStorage + artificial latency.
 */

import { SEED_TRANSACTIONS } from "@/lib/mockTransactions";

const TX_KEY = "fintrack_transactions";

const DEFAULT_DELAY_MS = 350;

function delay(ms = DEFAULT_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readRaw() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TX_KEY);
  } catch {
    return null;
  }
}

function writeRaw(list) {
  localStorage.setItem(TX_KEY, JSON.stringify(list));
}

/** Load transactions; seed demo data once if empty */
export async function fetchTransactions() {
  await delay();
  const raw = readRaw();
  if (!raw) {
    const seed = SEED_TRANSACTIONS.map((t) => ({ ...t }));
    writeRaw(seed);
    return seed;
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTransactions(list) {
  await delay(220);
  writeRaw(list);
}
