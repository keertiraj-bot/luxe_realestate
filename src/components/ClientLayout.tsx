"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navbar />}
            <main className="min-h-screen">
                {children}
            </main>
            {!isAdminPage && <Footer />}
            {!isAdminPage && <FloatingWhatsApp />}
        </>
    );
}
