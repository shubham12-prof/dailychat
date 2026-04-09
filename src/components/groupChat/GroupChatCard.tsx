import React from "react";
import { CustomUser } from "../../app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-row justify-between items-center p-6 pb-2">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          {group.title}
        </h2>
        <GroupChatCardMenu user={user} group={group} />
      </div>
      <div className="p-6 pt-4">
        <p>
          Passcode :- <strong>{group.passcode}</strong>
        </p>
        <p>Created At :- {new Date(group.created_at).toDateString()}</p>
      </div>
    </div>
  );
}
