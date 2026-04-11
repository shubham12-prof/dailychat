"use client";
import { getSocket } from "@/lib/socket.config";
import { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
export default function ChatBase() {
  let socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log("the socket message is ", data);
    });
    return () => {
      socket.close();
    };
  }, []);
  const handleClick = () => {
    socket.emit("message", { name: "shubham", id: uuidV4() });
    console.log("button clicked");
  };
  return (
    <div>
      <div>ChatBase</div>
      <button onClick={handleClick}>Send message</button>
    </div>
  );
}
