import React from "react";
import ProfileMenu from "../../components/auth/profileMenu";

export default function dashNav({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  return (
    <div>
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold">DailyChat</h1>
        <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
          <ProfileMenu name={name} image={image} />
        </div>
      </nav>
    </div>
  );
}
