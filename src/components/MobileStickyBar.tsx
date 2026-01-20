"use client";

import { MessageCircle, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function MobileStickyBar() {
    const [isVisible, setIsVisible] = useState(false);
    const number = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "911234567890";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-t border-slate-200 dark:border-slate-800"
                >
                    <div className="flex gap-3">
                        <a
                            href={`https://wa.me/${number}?text=I'm interested in luxury properties.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-whatsapp text-white h-16 rounded-2xl flex items-center justify-center gap-2 font-black text-sm shadow-lg shadow-whatsapp/20"
                        >
                            <MessageCircle size={20} /> WHATSAPP
                        </a>
                        <a
                            href="/contact"
                            className="flex-1 bg-accent text-white h-16 rounded-2xl flex items-center justify-center gap-2 font-black text-sm shadow-lg shadow-accent/20"
                        >
                            <Calendar size={20} /> SITE VISIT
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
