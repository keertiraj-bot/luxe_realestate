"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize, MessageCircle } from "lucide-react";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        price: number;
        location: string;
        type: string;
        image: string;
        area?: string;
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const whatsappLink = getWhatsAppLink(property.title, property.location, formatPrice(property.price));

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800"
        >
            <Link href={`/properties/${property.id}`} className="block relative h-64 overflow-hidden">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {property.type}
                    </span>
                </div>
            </Link>

            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <Link href={`/properties/${property.id}`}>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                            {property.title}
                        </h3>
                    </Link>
                    <p className="text-accent font-black text-xl">
                        {formatPrice(property.price)}
                    </p>
                </div>

                <div className="flex flex-col gap-3 mb-8 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-accent" />
                        <span>{property.location}</span>
                    </div>
                    {property.area && (
                        <div className="flex items-center gap-2">
                            <Maximize size={16} className="text-accent" />
                            <span>{property.area}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link
                        href={`/properties/${property.id}`}
                        className="flex items-center justify-center py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                        Details
                    </Link>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-whatsapp text-white font-bold hover:opacity-90 transition-all shadow-md active:scale-95"
                    >
                        <MessageCircle size={18} />
                        Chat
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
