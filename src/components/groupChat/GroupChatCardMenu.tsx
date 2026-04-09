"use client";
import { Suspense, useState, useRef, useEffect } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { CustomUser } from "../../app/api/auth/[...nextauth]/options";
import EditGroupChat from "./EditGroupChat";
import { toast } from "sonner";
import Env from "../../lib/env";

const DeleteChatGroup = dynamic(() => import("./DeleteChatGroup"));

export default function GroupChatCardMenu({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/chat/${group.id}`);
    toast.success("Link copied successfully!");
    setMenuOpen(false);
  };

  return (
    <>
      {deleteDialog && (
        <Suspense fallback={<p>Loading...</p>}>
          <DeleteChatGroup
            open={deleteDialog}
            setOpen={setDeleteDialog}
            groupId={group.id}
            token={user.token!}
          />
        </Suspense>
      )}
      {editDialog && (
        <Suspense fallback={<p>Loading...</p>}>
          <EditGroupChat
            open={editDialog}
            setOpen={setEditDialog}
            user={user}
            group={group}
          />
        </Suspense>
      )}

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <DotsVerticalIcon className="h-5 w-5" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 z-50 mt-1 w-36 rounded-md border border-gray-200 bg-white shadow-md">
            <div className="py-1">
              <button
                onClick={handleCopy}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={() => {
                  setEditDialog(true);
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteDialog(true);
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
