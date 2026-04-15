"use client";
import React, { useState } from "react";

export default function MobileChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col justify-center items-center gap-1 p-1"
      >
        <span className="w-5 h-0.5 bg-black dark:bg-white block"></span>
        <span className="w-5 h-0.5 bg-black dark:bg-white block"></span>
        <span className="w-5 h-0.5 bg-black dark:bg-white block"></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-2xl font-bold">Users</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black dark:hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          {users.length > 0 ? (
            users.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-md p-2 mt-2"
              >
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Joined:{" "}
                  <span>{new Date(item.created_at).toDateString()}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No users found</p>
          )}
        </div>
      </div>
    </>
  );
}
