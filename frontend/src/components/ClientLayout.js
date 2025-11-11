"use client";

import { LanguageProvider } from "../contexts/LanguageContext";

export default function ClientLayout({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

