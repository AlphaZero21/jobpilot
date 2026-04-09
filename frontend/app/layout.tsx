import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "JobPilot Dashboard",
  description: "Track and manage your job applications",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}