"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const [open, setOpen] = useState(false);

  const handleGoogleLogin = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Getting start
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to DailyChat
            </h2>

            <p className="text-gray-600 mb-6">
              DailyChat makes it effortless to create secure chat links and
              start conversations in seconds.
            </p>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"
            >
              <Image
                src="/images/google.png"
                width={20}
                height={20}
                alt="google"
              />
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}
