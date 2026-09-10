import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Farm Agrotech",
  description: "Order & Stock Visibility Portal",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
          <header style={{ padding: "1rem 2rem", borderBottom: "1px solid #ddd" }}>
            <strong>Green Farm Agrotech</strong>
          </header>
          <main style={{ padding: "2rem" }}>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}