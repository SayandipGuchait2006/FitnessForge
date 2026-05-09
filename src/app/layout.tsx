import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avenger The Fitness Temple — Premium Fitness Club",
  description: "Forge Your Strongest Self. Premium fitness, elite coaching, extraordinary results. Join the most trusted gym in Bangalore.",
  keywords: ["AVENGER FITNESS", "gym", "fitness", "premium gym", "personal training", "HIIT", "yoga", "boxing", "CrossFit", "Bangalore gym"],
  authors: [{ name: "Avenger The Fitness Temple" }],
  icons: {
    icon: "/images/gym-logo.png",
  },
  openGraph: {
    title: "Avenger The Fitness Temple — Premium Fitness Club",
    description: "Forge Your Strongest Self. Premium fitness, elite coaching, extraordinary results.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avenger The Fitness Temple — Premium Fitness Club",
    description: "Forge Your Strongest Self. Premium fitness, elite coaching, extraordinary results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
