"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole =
  | "visiteur"
  | "etudiant"
  | "chercheur"
  | "responsable_axe"
  | "partenaire"
  | "directeur";

export interface AuthUser {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
  langue: "fr" | "en";
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  authLoading: boolean; // true until localStorage has been read
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  authLoading: true,
  login: () => {},
  logout: () => {},
  hasRole: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("ummisco_token");
      const savedUser = localStorage.getItem("ummisco_user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = (tok: string, u: AuthUser) => {
    setToken(tok);
    setUser(u);
    setAuthLoading(false);
    try {
      localStorage.setItem("ummisco_token", tok);
      localStorage.setItem("ummisco_user", JSON.stringify(u));
    } catch {}
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem("ummisco_token");
      localStorage.removeItem("ummisco_user");
    } catch {}
  };

  const hasRole = (...roles: UserRole[]) =>
    !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, authLoading, login, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
