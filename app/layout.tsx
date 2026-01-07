import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import LenisProvider from "../provider/lenis";
import { LoaderProvider } from "@/context/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lider Bektaş | Developer",
  description:
    "Lider Bektaş'ın kişisel web sitesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoaderProvider>
          <LenisProvider>
            <Header />
            {children}
          </LenisProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
