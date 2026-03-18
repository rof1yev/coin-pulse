import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const poppinsFont = DM_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoinPulse",
  description:
    "Crypto Screener App with a built-in High-Frequency Terminal & Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppinsFont.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
