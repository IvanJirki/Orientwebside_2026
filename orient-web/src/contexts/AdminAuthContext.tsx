import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const SESSION_KEY = "orient-admin-session";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  /** False if VITE_ADMIN_PASSWORD is not set in build. */
  adminPasswordConfigured: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function getExpectedPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD ?? "";
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(SESSION_KEY));

  const adminPasswordConfigured = Boolean(getExpectedPassword());

  const login = useCallback((password: string) => {
    const expected = getExpectedPassword();
    if (!expected || password !== expected) {
      return false;
    }
    const t = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, t);
    setToken(t);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      adminPasswordConfigured,
    }),
    [token, login, logout, adminPasswordConfigured],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
