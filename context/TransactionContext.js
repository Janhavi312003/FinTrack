"use client";

import {
  fetchTransactions,
  saveTransactions,
} from "@/lib/transactionsService";
import { useAuth } from "@/context/AuthContext";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const reload = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const list = await fetchTransactions();
    setTransactions(list);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) reload();
    else {
      setTransactions([]);
      setLoading(false);
    }
  }, [user, reload]);

  const addTransaction = useCallback(async (row) => {
    const newRow = {
      id: String(Date.now()),
      date: row.date,
      amount: Number(row.amount),
      category: row.category.trim(),
      type: row.type === "income" ? "income" : "expense",
    };
    setTransactions((prev) => {
      const next = [newRow, ...prev];
      saveTransactions(next);
      return next;
    });
  }, []);

  const updateTransaction = useCallback(async (id, row) => {
    setTransactions((prev) => {
      const next = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              date: row.date,
              amount: Number(row.amount),
              category: row.category.trim(),
              type: row.type === "income" ? "income" : "expense",
            }
          : t,
      );
      saveTransactions(next);
      return next;
    });
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    setTransactions((prev) => {
      const next = prev.filter((t) => t.id !== id);
      saveTransactions(next);
      return next;
    });
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    transactions.forEach((t) => set.add(t.category));
    return Array.from(set).sort();
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    if (typeFilter !== "all") {
      list = list.filter((t) => t.type === typeFilter);
    }
    if (categoryFilter !== "all") {
      list = list.filter((t) => t.category === categoryFilter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) =>
          t.category.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) => {
      if (sortBy === "date-desc" || sortBy === "date-asc") {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return sortBy === "date-desc" ? db - da : da - db;
      }
      if (sortBy === "amount-desc") return b.amount - a.amount;
      return a.amount - b.amount;
    });

    return list;
  }, [transactions, typeFilter, categoryFilter, search, sortBy]);

  const value = useMemo(
    () => ({
      transactions,
      filteredTransactions,
      categories,
      loading,
      reload,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      search,
      setSearch,
      typeFilter,
      setTypeFilter,
      categoryFilter,
      setCategoryFilter,
      sortBy,
      setSortBy,
    }),
    [
      transactions,
      filteredTransactions,
      categories,
      loading,
      reload,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      search,
      typeFilter,
      categoryFilter,
      sortBy,
    ],
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx)
    throw new Error("useTransactions must be used inside TransactionProvider");
  return ctx;
}
