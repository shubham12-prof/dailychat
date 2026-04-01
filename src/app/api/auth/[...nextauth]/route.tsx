import NextAuth from "next-auth/next";
import { authOptions } from "./options";

console.log("NEXT AUTH LOADED");
const nextAuth = NextAuth(authOptions);
export { nextAuth as GET, nextAuth as POST };
