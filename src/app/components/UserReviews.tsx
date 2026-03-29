"use client";
import React from "react";

export default function UserReviews() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        What Our Users Say
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <div className="p-6 text-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 max-w-sm">
          <p className="text-lg text-gray-700">
            “DailyChat is a game-changer! The fastest way to start a chat.”
          </p>

          <div className="mt-6">
            <img
              src="/images/user1.png"
              alt="User 1"
              className="w-12 h-12 rounded-full mx-auto"
            />
            <div className="mt-2 text-gray-900 font-medium">
              John Doe, Developer
            </div>
          </div>
        </div>

        <div className="p-6 text-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 max-w-sm">
          <p className="text-lg text-gray-700">
            “The encryption is top-notch. I feel secure using DailyChat.”
          </p>

          <div className="mt-6">
            <img
              src="/images/user2.png"
              alt="User 2"
              className="w-12 h-12 rounded-full mx-auto"
            />
            <div className="mt-2 text-gray-900 font-medium">
              Jane Smith, Designer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
