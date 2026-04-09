import React from "react";
import DashNav from "../../components/dashboard/dashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchChatGroups } from "../../fetch/groupFetch";
import CreateChat from "../../components/groupChat/CreateChat";
import GroupChatCard from "../../components/groupChat/GroupChatCard";
export default async function page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<ChatGroupType> | [] = await fetchChatGroups(
    session?.user?.token!,
  );
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <div className="container mx-auto">
        <div className="w-full mt-6 flex justify-end">
          <CreateChat user={session?.user!} />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-4">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>
    </div>
  );
}
