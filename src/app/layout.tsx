import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/blocks/Footer";
import { SiteNav } from "@/components/nav/SiteNav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { meta } from "@/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),
  title: {
    default: "ENIRIQ",
    template: "%s | ENIRIQ",
  },
  description: meta.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-mist">
        <TooltipProvider>
          <SiteNav />
          <main>{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
