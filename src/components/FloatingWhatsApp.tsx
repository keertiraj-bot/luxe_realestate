"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
    const number = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "911234567890";
    const link = `https://wa.me/${number}`;

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 p-4 bg-whatsapp text-white rounded-full shadow-2xl flex items-center justify-center group"
        >
            <div className="absolute -left-32 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden md:block shadow-md">
                Chat with us!
            </div>
            <MessageCircle size={32} />
        </motion.a>
    );
}
