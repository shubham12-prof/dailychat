import ChatBase from "@/components/chat/ChatBase";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  console.log("the group id is ", params.id);
  return (
    <div>
      <p>chat</p>
      <ChatBase />
    </div>
  );
}
