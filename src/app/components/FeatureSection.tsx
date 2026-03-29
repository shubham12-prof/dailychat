"use client";
import React from "react";
import FeatureCard from "./FeatureCard";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50"
    >
      
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Powerful Features
        </h2>
        <p className="text-gray-600 mt-4">
          Everything you need to start fast, stay secure, and chat seamlessly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon="🚀"
          title="Instant Setup"
          description="Generate a room link in seconds. No account required."
        />
        <FeatureCard
          icon="🔒"
          title="Secure"
          description="Passcode protection for your private conversations."
        />
        <FeatureCard
          icon="💻"
          title="Cross-Platform"
          description="Works on any device with a modern web browser."
        />
      </div>

    </section>
  );
}