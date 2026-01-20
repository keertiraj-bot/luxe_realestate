"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize, MessageCircle, Bed, Bath, Star, Zap, Heart, ArrowRight } from "lucide-react";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { useWishlist } from "@/components/WishlistContext";

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        price: number;
        location: string;
        type: string;
        image: string;
        area?: string;
        bedrooms?: number;
        bathrooms?: number;
        isNew?: boolean;
        isFeatured?: boolean;
        status?: string;
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const whatsappLink = getWhatsAppLink(property.title, property.location, formatPrice(property.price));
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isSaved = isInWishlist(property.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-500 border border-slate-100 dark:border-slate-800 relative flex flex-col"
        >
            {/* Image Section */}
            <Link href={`/properties/${property.id}`} className="block relative h-72 overflow-hidden">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tags */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {property.isNew && (
                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/30">
                            <Zap size={10} fill="currentColor" /> New Launch
                        </span>
                    )}
                    {property.isFeatured && (
                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                            <Star size={10} className="text-amber-500" fill="currentColor" /> Featured
                        </span>
                    )}
                </div>

                <div className="absolute bottom-6 right-6">
                    <span className="px-4 py-1.5 bg-emerald-500/90 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {property.status || "Ready to Move"}
                    </span>
                </div>

                {/* Wishlist Button On Image */}
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(property.id); }}
                    className={`absolute top-6 right-6 p-4 rounded-2xl backdrop-blur-md transition-all z-20 shadow-xl ${isSaved ? "bg-red-500 text-white scale-110" : "bg-white/20 text-white hover:bg-white/40"}`}
                >
                    <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                </button>
            </Link>

            {/* Content Section */}
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2 block">{property.type}</span>
                        <Link href={`/properties/${property.id}`}>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-accent transition-colors line-clamp-1 tracking-tighter">
                                {property.title}
                            </h3>
                        </Link>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                        <MapPin size={16} className="text-accent" />
                        <span>{property.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-50 dark:border-slate-800/50">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Beds</span>
                            <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                                <Bed size={14} className="text-accent" /> {property.bedrooms || 3}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 border-x border-slate-50 dark:border-slate-800/50 px-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Baths</span>
                            <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                                <Bath size={14} className="text-accent" /> {property.bathrooms || 3}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 pl-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Area</span>
                            <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white">
                                <Maximize size={14} className="text-accent" /> {property.area?.split(' ')[0] || "2400"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Pricing</span>
                        <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                            {formatPrice(property.price)}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={`/properties/${property.id}`}
                            className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                        >
                            <ArrowRight size={24} />
                        </Link>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-whatsapp text-white rounded-2xl shadow-xl shadow-whatsapp/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            <MessageCircle size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
