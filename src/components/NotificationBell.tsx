"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, X, BookOpen, Calendar, Database, Info, CheckCheck, MailOpen, Mail } from "lucide-react";
import Link from "next/link";
import { useInbox, InboxItem, InboxItemType } from "@/context/InboxContext";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `Il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Hier";
  if (d < 7) return `Il y a ${d}j`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

const TYPE_CONFIG: Record<InboxItemType, { icon: React.ElementType; color: string; bg: string }> = {
  publication: { icon: BookOpen, color: "text-blue-400",   bg: "bg-blue-500/10"   },
  event:       { icon: Calendar, color: "text-violet-400", bg: "bg-violet-500/10" },
  info:        { icon: Database, color: "text-green-400",  bg: "bg-green-500/10"  },
  system:      { icon: Info,     color: "text-slate-400",  bg: "bg-slate-700/50"  },
};

function NotifRow({
  notif,
  onRead,
  onUnread,
  onRemove,
  onClose,
}: {
  notif: InboxItem;
  onRead: (id: string) => void;
  onUnread: (id: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}) {
  const { icon: Icon, color, bg } = TYPE_CONFIG[notif.type];

  const handleClick = () => {
    onRead(notif.id);
    if (notif.link) onClose();
  };

  const handleToggleRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    notif.read ? onUnread(notif.id) : onRead(notif.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove(notif.id);
  };

  const rowClass = `relative flex items-start gap-3 px-4 py-3.5 transition-colors group ${
    notif.read ? "hover:bg-slate-900/40" : "bg-blue-500/5 hover:bg-blue-500/10"
  }`;

  const inner = (
    <>
      {!notif.read && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-500 flex-none" />
      )}
      <div className={`flex-none flex items-center justify-center h-8 w-8 rounded-lg mt-0.5 ${bg}`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <p className={`text-[11px] font-semibold leading-snug ${notif.read ? "text-slate-300" : "text-white"}`}>
          {notif.title}
        </p>
        <p className="mt-0.5 text-[10px] text-slate-500 leading-relaxed line-clamp-2">
          {notif.body}
        </p>
        <p className="mt-1 text-[9px] text-slate-600 font-medium">{relativeTime(notif.timestamp)}</p>
      </div>
      <div className="flex-none flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all mt-0.5">
        <button
          onClick={handleToggleRead}
          className="p-1 rounded text-slate-600 hover:text-blue-400 hover:bg-slate-800 transition-all"
          title={notif.read ? "Marquer comme non lu" : "Marquer comme lu"}
        >
          {notif.read ? <Mail className="h-3 w-3" /> : <MailOpen className="h-3 w-3" />}
        </button>
        <button
          onClick={handleRemove}
          className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-800 transition-all"
          title="Supprimer"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </>
  );

  if (notif.link) {
    return (
      <Link href={notif.link} onClick={handleClick} className={rowClass}>
        {inner}
      </Link>
    );
  }

  return (
    <div onClick={handleClick} role="button" tabIndex={0} className={`cursor-pointer ${rowClass}`}>
      {inner}
    </div>
  );
}


export default function NotificationBell() {
  const { items, unreadCount, markRead, markUnread, markAllRead, remove } = useInbox();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const unreadItems = items.filter((n) => !n.read);
  const displayed = filter === "unread" ? unreadItems : items;

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative p-2 rounded-lg border transition-all ${
          open
            ? "border-slate-600 bg-slate-800 text-slate-200"
            : "border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
        }`}
        aria-label="Notifications"
      >
        <Bell className="h-3.5 w-3.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-[340px] rounded-xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/60 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-blue-400 transition-colors font-semibold"
                >
                  <CheckCheck className="h-3 w-3" />
                  <span>Tout lire</span>
                </button>
              )}
            </div>

            {/* Filter tabs */}
            <div className="flex border-b border-slate-800">
              {(["all", "unread"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    filter === f ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {f === "all"
                    ? `Toutes (${items.length})`
                    : `Non lues (${unreadItems.length})`}
                  {filter === f && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-900">
              {displayed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-600">
                  <Bell className="h-8 w-8 opacity-20" />
                  <p className="text-[11px] font-medium">
                    {filter === "unread" ? "Aucune notification non lue" : "Aucune notification"}
                  </p>
                </div>
              ) : (
                displayed.map((notif) => (
                  <NotifRow
                    key={notif.id}
                    notif={notif}
                    onRead={markRead}
                    onUnread={markUnread}
                    onRemove={remove}
                    onClose={() => setOpen(false)}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-800 px-4 py-2 bg-slate-900/30">
                <p className="text-[9px] text-slate-600 text-center font-medium">
                  {items.length} notification{items.length > 1 ? "s" : ""} · Sauvegardées dans ce navigateur
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
