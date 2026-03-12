import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/Provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdCommand AI | Meta Ads Intelligence",
  description: "Advanced AI command center for Meta Ads. Analyze, optimize, and command your campaigns with multi-model intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
