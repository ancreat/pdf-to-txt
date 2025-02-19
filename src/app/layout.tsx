import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Pdf to text App",
  description: "Pdf to text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.className}>
      <body>
        <Providers>
          <ThemeProvider attribute="class">
            <Header />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
