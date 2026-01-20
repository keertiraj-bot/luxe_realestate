"use client";

import { useEffect, useState } from "react";
import { ALL_PROPERTIES } from "@/lib/data";
import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";

export default function RecentlyViewed() {
    const [recent, setRecent] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("luxe_recent");
        if (saved) {
            const ids = JSON.parse(saved) as string[];
            const properties = ids
                .map(id => ALL_PROPERTIES.find(p => p.id === id))
                .filter(Boolean)
                .slice(0, 3);
            setRecent(properties);
        }
    }, []);

    if (recent.length === 0) return null;

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">Based on your activity</h3>
                    <h4 className="text-3xl font-black tracking-tighter">RECENTLY <span className="text-slate-400">VIEWED</span></h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {recent.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
}
