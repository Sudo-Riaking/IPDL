"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { InboxProvider } from "@/context/InboxContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <NotificationProvider>
            <InboxProvider>{children}</InboxProvider>
          </NotificationProvider>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
