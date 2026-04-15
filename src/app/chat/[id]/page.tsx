import ChatBase from "../../../components/chat/ChatBase";
import { fetchChatGroup, fetchChatGroupUsers } from "../../../fetch/groupFetch";
import { notFound } from "next/navigation";
import { fetchChats } from "@/fetch/chatsFetch";
import { getServerSession } from "next-auth";
import {
  authOptions,
  CustomSession,
} from "../../api/auth/[...nextauth]/options"; // 👈

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || id.length !== 36) {
    return notFound();
  }

  const session = (await getServerSession(authOptions)) as CustomSession; // 👈
  const token = session?.user?.token ?? ""; // 👈

  const group: ChatGroupType | null = await fetchChatGroup(id);
  if (group === null) {
    return notFound();
  }

  const users: Array<GroupChatUserType> | [] = await fetchChatGroupUsers(
    id,
    token,
  );

  const chats: Array<MessageType> | [] = await fetchChats(id);

  return (
    <div className="h-full">
      <ChatBase users={users} group={group} oldMessages={chats} />
    </div>
  );
}
