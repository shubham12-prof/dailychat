"use client";
import React from "react";

const avatarColors = [
  "from-indigo-500 to-violet-600",
  "from-pink-500 to-rose-600",
  "from-sky-500 to-cyan-600",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-600",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="px-5 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Members
        </h1>
        {users.length > 0 && (
          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
            {users.length}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {users.length > 0 ? (
          users.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150 group"
            >
              <div
                className={`w-9 h-9 rounded-lg shrink-0 bg-linear-to-b ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}
              >
                {getInitials(item.name)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 text-lg">
              👥
            </div>
            <p className="text-sm font-medium text-slate-400">No members yet</p>
          </div>
        )}
      </div>
    </aside>
  );
}
