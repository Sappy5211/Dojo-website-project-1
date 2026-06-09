import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: {
    default: "Startup A",
    template: "%s | Startup A",
  },
  description: meta.defaultDescription,
};

export const viewport: Viewport = {
  themeColor: "#060A09",
  colorScheme: "dark",
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
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-energy focus:px-4 focus:py-2 focus:font-semibold focus:text-ink">Skip to content</a>
        <TooltipProvider>
          <SiteNav />
          <main id="main">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
