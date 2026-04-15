import { CHAT_GROUP, CHAT_GROUP_USERS } from "../lib/apiEndPoint";

export async function fetchChatGroups(token: string) {
  const url = CHAT_GROUP;

  const res = await fetch(url, {
    headers: {
      Authorization: token,
    },
    cache: "no-store",
    next: {
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("fetchChatGroups error body:", errorBody);
    throw new Error(`Failed to fetch data: ${res.status} - ${errorBody}`);
  }

  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchChatGroup(id: string) {
  const res = await fetch(`${CHAT_GROUP}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}

export async function fetchChatGroupUsers(id: string, token: string) {
  const url = `${CHAT_GROUP_USERS}?group_id=${id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: token,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("fetchChatGroupUsers error body:", errorBody);
    throw new Error(`Failed to fetch data: ${res.status} - ${errorBody}`);
  }

  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
