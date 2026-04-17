"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function HeroSection({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  const handleGoogleLogin = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6 md:px-12 bg-linear-to-b from-black to-blue-700">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
        Chat links that feel
        <span className="text-transparent bg-clip-text bg-linear-to-b from-purple-400 to-green-600">
          {" "}
          like the future
        </span>
      </h1>

      <p className="text-lg md:text-xl w-1/2 text-gray-300 mb-8 ">
        Generate secure, instant conversation links. Share anywhere.
        <span className="text-transparent bg-clip-text bg-linear-to-b from-purple-400 to-green-600">
          {" "}
          Zero friction, infinite reach.
        </span>
      </p>

      <button
        onClick={() => setOpen(true)}
        className="px-8 py-3 text-lg font-semibold text-white bg-black rounded-xl shadow-md hover:bg-gray-800 hover:scale-105 transition duration-300 animate-pulse"
      >
        Start Chatting
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

      <div className="w-full flex items-center justify-center mt-10">
        <div className="w-full max-w-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-18 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                Virat
              </div>

              <div className="bg-indigo-900/50 border border-indigo-500/20 text-gray-200 px-4 py-3 rounded-xl max-w-xs">
                Hey! You've joined via a secure link. How can I help you today?
              </div>
            </div>

            {/* Right message */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-emerald-900/40 border border-emerald-500/20 text-gray-200 px-4 py-3 rounded-xl max-w-xs">
                I just received this link from my team. This is seamless!
              </div>

              <div className="w-18 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">
                Rohit
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-18 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                Virat
              </div>

              <div className="bg-indigo-900/50 border border-indigo-500/20 text-gray-200 px-4 py-3 rounded-xl max-w-xs">
                Glad to have you. Your messages are securely transmitted over
                HTTPS and protected with authentication.
              </div>
            </div>

            <div className="flex items-start justify-end gap-3">
              <div className="bg-emerald-900/40 border border-emerald-500/20 text-gray-200 px-4 py-3 rounded-xl max-w-xs">
                Can I generate my own link to share with others?
              </div>

              <div className="w-18 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">
                Rohit
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                DC
              </div>

              <div className="flex gap-1 px-4 py-3 bg-indigo-900/50 border border-indigo-500/20 rounded-xl">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
