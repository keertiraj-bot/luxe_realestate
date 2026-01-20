"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
    title: string;
    location: string;
    price: string;
    className?: string;
}

export default function WhatsAppButton({ title, location, price, className }: WhatsAppButtonProps) {
    const link = getWhatsAppLink(title, location, price);

    const handleClick = () => {
        trackEvent("whatsapp_click", {
            property_title: title,
            property_location: location,
            property_price: price
        });
    };

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-whatsapp text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all ${className}`}
        >
            <MessageCircle size={20} className="animate-pulse" />
            <span>Chat on WhatsApp</span>
        </motion.a>
    );
}
