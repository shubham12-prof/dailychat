"use client";
import React, { useState, useRef, useEffect } from "react";
import UserAvatar from "../../components/common/userAvatar";
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import("./logoutModel"));

export default function ProfileMenu({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {logoutOpen && <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />}

      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <UserAvatar name={name} image={image} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <div className="px-3 py-2 text-sm font-semibold text-gray-700">
              My Account
            </div>

            <div className="border-t border-gray-200" />

            <button
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setMenuOpen(false);
                setLogoutOpen(true);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
