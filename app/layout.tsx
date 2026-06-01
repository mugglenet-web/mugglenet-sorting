import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MuggleNet Sorting Hat Quiz",
  description: "A magical, animated Sorting Hat experience built for MuggleNet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
