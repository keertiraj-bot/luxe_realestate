"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/utils";

interface WhatsAppButtonProps {
    title: string;
    location: string;
    price: string;
    className?: string;
}

export default function WhatsAppButton({ title, location, price, className }: WhatsAppButtonProps) {
    const link = getWhatsAppLink(title, location, price);

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-whatsapp text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all ${className}`}
        >
            <MessageCircle size={20} className="animate-pulse" />
            <span>Quick Enquiry</span>
        </motion.a>
    );
}
