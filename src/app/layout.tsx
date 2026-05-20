import { ConsoleGreeting } from "@/components/console-greeting";
import { EcashEgg } from "@/components/ecash-egg";
import Navbar from "@/components/navbar";
import { SiteToaster } from "@/components/site-toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: `${DATA.description} ${DATA.tagline}`,
  openGraph: {
    title: `${DATA.name}`,
    description: `${DATA.description} ${DATA.tagline}`,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistPixelSquare.variable)}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-4xl mx-auto pt-12 sm:pt-24 pb-28 px-6"
        )}
      >
        <div className="scroll-progress" aria-hidden="true" />
        <ConsoleGreeting />
        <EcashEgg />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
          <SiteToaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
