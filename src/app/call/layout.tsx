import { Public_Sans } from "next/font/google";
import { Geist, Geist_Mono, Figtree, Instrument_Serif } from "next/font/google";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/common/call/app/theme-provider";
import { ThemeToggle } from "@/components/common/call/app/theme-toggle";
import { cn } from "@/lib/utils";
import { getAppConfig, getStyles } from "@/lib/call/utils";
import Dashboardnavbar from "@/components/common/dash/dashnav/dashboardnavbar";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);
  const styles = getStyles(appConfig);
  const { pageTitle, pageDescription } = appConfig;

  return (
    <div
      className={cn(
        publicSans.variable,
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        instrumentSerif.variable,
        "scroll-smooth font-sans antialiased min-h-screen",
      )}
    >
      {/* Inject styles, title, and metadata safely using Next.js head merging capability */}
      {styles && <style>{styles}</style>}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Dashboardnavbar />

        {children}
        <div className="group fixed bottom-0 left-1/2 z-50 mb-2 -translate-x-1/2">
          <ThemeToggle className="translate-y-20 transition-transform delay-150 duration-300 group-hover:translate-y-0" />
        </div>
      </ThemeProvider>
    </div>
  );
}
