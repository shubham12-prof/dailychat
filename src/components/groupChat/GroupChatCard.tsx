"use client";

import { CustomUser } from "../../app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import Env from "../../lib/env";
import { toast } from "sonner";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${Env.APP_URL}/chat/${group.id}`);
      toast.success("Link copied successfully!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 tracking-tight">
          {group.title}
        </h2>
        <GroupChatCardMenu user={user} group={group} />
      </div>

      <div className="px-4 py-3 space-y-2 text-sm text-gray-500">
        <p className="flex items-center justify-between">
          <span>Passcode</span>
          <span className="font-mono tracking-widest text-gray-800 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md text-xs">
            {group.passcode}
          </span>
        </p>

        <p className="flex items-center justify-between">
          <span>Created</span>
          <span className="text-gray-700">
            {new Date(group.created_at).toDateString()}
          </span>
        </p>
      </div>

      <div className="px-4 py-3 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleCopy}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600
          hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900
          active:scale-95 transition-all duration-150"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
