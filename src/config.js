// config.js
"use client";

console.log("🌐 NODE_ENV:", process.env.NODE_ENV);
console.log("🔗 NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.NEXT_PUBLIC_API_URL || "https://landing-gsap-three-production-3b59.up.railway.app";

export { API_URL };
