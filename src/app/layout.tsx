import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "ZORO — Finance Admin Dashboard",
  description: "Premium Crypto & Finance Admin Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
