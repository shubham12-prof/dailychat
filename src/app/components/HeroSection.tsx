"use client";
import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
        Instant Chat Links for Seamless Conversations
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        DailyChat makes it effortless to create secure chat links and start
        conversations in seconds.
      </p>

      <Link href="/dashboard">
        <button className="px-8 py-3 text-lg font-semibold text-white bg-black rounded-xl shadow-md hover:bg-gray-800 hover:scale-105 transition duration-300 animate-pulse">
          Start Chatting
        </button>
      </Link>

      <div className="mt-16 w-full max-w-5xl flex justify-center">
        <img
          src="/images/conversation.svg"
          alt="Illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
