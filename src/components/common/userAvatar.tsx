import React from "react";
import Image from "next/image";

export default function UserAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      {image ? (
        <Image src={image} alt={name} fill className="object-cover" />
      ) : (
        <span className="text-sm font-medium text-gray-700">
          {name[0].toUpperCase()}
        </span>
      )}
    </div>
  );
}
