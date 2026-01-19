import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Luxe Realty | Premium Properties for Buyers",
    description: "Find your dream home with Luxe Realty. Verified properties in the best locations with direct WhatsApp support.",
    keywords: "real estate, buy home, luxury flats, property search, WhatsApp real estate",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <FloatingWhatsApp />
            </body>
        </html>
    );
}
