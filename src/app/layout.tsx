import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import AuthProvider from "@/components/providers/AuthProvider";
import ToastContainer from "@/components/common/Onboarding/onboarding/Toast";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "MeetMind";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: `${appName} — Interview better with Meetmind.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        instrumentSerif.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
