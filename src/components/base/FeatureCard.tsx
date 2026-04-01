"use client";
import React from "react";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300">
      
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
      
    </div>
  );
}