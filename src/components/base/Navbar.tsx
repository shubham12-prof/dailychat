"use client";

import Link from "next/link";
import { useState } from "react";
import { CustomUser } from "../../app/api/auth/[...nextauth]/options";
import LoginModal from "../../components/auth/loginModel";

export default function Navbar({ user }: { user: CustomUser | null }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-black shadow-md">
      <h1 className="text-xl md:text-2xl font-extrabold text-white">
        DailyChat
      </h1>

      <div className="hidden md:flex items-center space-x-6 text-gray-300">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>

        {!user ? <LoginModal /> : <Link href="/dashboard">Dashboard</Link>}
      </div>

      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-start p-6 space-y-4 text-gray-300 md:hidden">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="#features" onClick={() => setOpen(false)}>
            Features
          </Link>

          {!user ? (
            <div onClick={() => setOpen(false)}>
              <LoginModal />
            </div>
          ) : (
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
