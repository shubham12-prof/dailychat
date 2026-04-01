"use client";
import React, { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";

export default function logoutModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />

      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Are you absolutely sure?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This action will expire your session.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
