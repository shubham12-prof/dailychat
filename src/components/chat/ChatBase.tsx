"use client";
import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

export default function ChatBase({
  group,
  users,
  oldMessages = [],
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar users={users} />

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Members
            </h2>
            {users.length > 0 && (
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                {users.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 text-sm transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-65px)] p-3 space-y-1">
          {users.map((item, index) => {
            const colors = [
              "from-indigo-500 to-violet-600",
              "from-pink-500 to-rose-600",
              "from-sky-500 to-cyan-600",
              "from-amber-500 to-orange-500",
              "from-emerald-500 to-teal-600",
            ];
            const initials = item.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg shrink-0 bg-linear-to-br ${colors[index % colors.length]} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {initials}
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
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:hidden flex-shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col justify-center items-center gap-1.25 w-10 h-10 rounded-xl shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
          >
            <span className="block w-4 h-[1.5px] bg-slate-700 dark:bg-slate-200 rounded-full" />
            <span className="block w-4 h-[1.5px] bg-slate-700 dark:bg-slate-200 rounded-full" />
            <span className="block w-4 h-[1.5px] bg-slate-700 dark:bg-slate-200 rounded-full" />
          </button>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
            {group.user_id}
          </span>
        </div>

        {open && <ChatUserDialog open={open} setOpen={setOpen} group={group} />}

        <div className="flex-1 overflow-hidden min-h-0">
          <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
        </div>
      </div>
    </div>
  );
}
