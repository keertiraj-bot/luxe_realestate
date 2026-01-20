"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WishlistProvider } from "@/components/WishlistContext";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    return (
        <WishlistProvider>
            {!isAdminPage && <Navbar />}
            <main className="min-h-screen">
                {children}
            </main>
            {!isAdminPage && <Footer />}
            {!isAdminPage && <FloatingWhatsApp />}
            {!isAdminPage && <MobileStickyBar />}
        </WishlistProvider>
    );
}
