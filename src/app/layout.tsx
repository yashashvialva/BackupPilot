import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BackupPilot | Cloud Backup Management SaaS",
  description: "Automated AWS EBS backups, retention policies, and volume restores in one clean, multi-tenant dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#0f172a', color: '#f1f5f9', border: '1px solid #1e293b', fontSize: '13px' } }} />
      </body>
    </html>
  );
}
