"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CHAT_GROUP } from "../../lib/apiEndPoint";
import { toast } from "sonner";
import { clearCache } from "../../actions/common";
import { useRouter } from "next/navigation";

export default function DeleteChatGroup({
  open,
  setOpen,
  groupId,
  token,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: string;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 👈 init router

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const deleteChatGroup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${CHAT_GROUP}/${groupId}`, {
        headers: { Authorization: token },
      });
      if (data?.message) {
        await clearCache("dashboard");
        toast.success(data?.message);
        setOpen(false);
        router.refresh();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Are you absolutely sure?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone. This will permanently delete your chat
            group and its conversations.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={deleteChatGroup}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
