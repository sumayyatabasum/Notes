import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Second Brain – AI Notes",
  description: "AI-powered smart note taking app with Gemini integration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
