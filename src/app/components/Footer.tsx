"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between">
        <div>
          <div>© 2026 DailyChat. All rights reserved.</div>
          <div className="space-x-4 mt-2">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
        <div className="space-y-4"></div>
      </div>
    </footer>
  );
}
