// config.js
"use client";

const isDev = process.env.NODE_ENV === "development";

export const API_URL = isDev
  ? "http://localhost:5000"
  : process.env.NEXT_PUBLIC_API_URL;