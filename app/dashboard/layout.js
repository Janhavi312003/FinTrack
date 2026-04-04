import AuthGuard from "@/components/AuthGuard";
import DashboardShell from "@/components/DashboardShell";
import { TransactionProvider } from "@/context/TransactionContext";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <TransactionProvider>
        <DashboardShell>{children}</DashboardShell>
      </TransactionProvider>
    </AuthGuard>
  );
}
