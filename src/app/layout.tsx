import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pengumuman Kelulusan",
  description: "Pengumuman Kelulusan Kelas 12 untuk Siswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/next.svg" type="image/png" sizes="32x32" />
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
