"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    return (
        <html lang="en">
            <body className={inter.className}>
                {!isAdminPage && <Navbar />}
                <main className="min-h-screen">
                    {children}
                </main>
                {!isAdminPage && <Footer />}
                {!isAdminPage && <FloatingWhatsApp />}
            </body>
        </html>
    );
}
