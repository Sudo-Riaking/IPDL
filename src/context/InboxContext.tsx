"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type InboxItemType = "publication" | "event" | "info" | "system";

export interface InboxItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: InboxItemType;
  link?: string;
}

interface InboxContextType {
  items: InboxItem[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  add: (item: Omit<InboxItem, "id" | "read" | "timestamp">) => void;
}

const STORAGE_KEY = "ummisco_inbox_v1";

const SEED: InboxItem[] = [
  {
    id: "seed-1",
    title: "Nouvelle publication indexée",
    body: "« Multi-agent modelling of malaria spread » a été validée et ajoutée au catalogue.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    type: "publication",
    link: "/publications",
  },
  {
    id: "seed-2",
    title: "Séminaire — Modélisation participative",
    body: "Un séminaire se tiendra le 20 juin 2026 à 14h00 au Campus ESP UCAD. Inscription obligatoire.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: "event",
    link: "/actualites",
  },
  {
    id: "seed-3",
    title: "Dataset mis à jour",
    body: "« Qualité de l'air — Dakar 2024 » contient maintenant 3 nouveaux fichiers CSV.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: "info",
    link: "/datasets",
  },
  {
    id: "seed-4",
    title: "Bienvenue sur le portail UMMISCO",
    body: "Explorez les publications, datasets et simulations de l'unité de recherche UMI 209.",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: "system",
  },
];

const InboxContext = createContext<InboxContextType>({
  items: [],
  unreadCount: 0,
  markRead: () => {},
  markAllRead: () => {},
  remove: () => {},
  add: () => {},
});

export function InboxProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InboxItem[]>(SEED);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const markRead = useCallback((id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const add = useCallback((item: Omit<InboxItem, "id" | "read" | "timestamp">) => {
    const newItem: InboxItem = {
      ...item,
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
  }, []);

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <InboxContext.Provider value={{ items, unreadCount, markRead, markAllRead, remove, add }}>
      {children}
    </InboxContext.Provider>
  );
}

export const useInbox = () => useContext(InboxContext);
