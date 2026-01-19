"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

const ALL_PROPERTIES = [
    {
        id: "1",
        title: "Skylight Penthouse",
        price: 45000000,
        location: "Mumbai",
        type: "Flat",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        area: "3200 sq.ft",
    },
    {
        id: "2",
        title: "Emerald Estate",
        price: 125000000,
        location: "Alibaug",
        type: "House",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
        area: "8500 sq.ft",
    },
    {
        id: "3",
        title: "Urban Loft",
        price: 18000000,
        location: "Bangalore",
        type: "Flat",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
        area: "1800 sq.ft",
    },
    {
        id: "4",
        title: "Sunset Villa",
        price: 35000000,
        location: "Goa",
        type: "House",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
        area: "4000 sq.ft",
    },
    {
        id: "5",
        title: "Palm Residency",
        price: 22000000,
        location: "Pune",
        type: "Flat",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
        area: "2100 sq.ft",
    },
    {
        id: "6",
        title: "Acacia Plots",
        price: 8500000,
        location: "Mysore",
        type: "Plot",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
        area: "5000 sq.ft",
    }
];

export default function PropertiesPage() {
    const [filteredProperties, setFilteredProperties] = useState(ALL_PROPERTIES);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("All");
    const [location, setLocation] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        let results = ALL_PROPERTIES;

        if (search) {
            results = results.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
        }

        if (type !== "All") {
            results = results.filter(p => p.type === type);
        }

        if (location !== "All") {
            results = results.filter(p => p.location === location);
        }

        setFilteredProperties(results);
    }, [search, type, location]);

    const locations = ["All", ...Array.from(new Set(ALL_PROPERTIES.map(p => p.location)))];
    const types = ["All", "Flat", "House", "Plot"];

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Available Properties</h1>
                    <p className="text-slate-500 text-lg">Browse our verified collection of premium real estate.</p>
                </div>

                {/* Filters & Search */}
                <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:bg-opacity-90 transition-all"
                        >
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Expandable Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-12 overflow-hidden"
                        >
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] grid grid-cols-1 md:grid-cols-3 gap-8 border border-white dark:border-slate-800">
                                <div>
                                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-slate-500">Property Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {types.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setType(t)}
                                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${type === t ? "bg-accent text-white shadow-md" : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-slate-500">Location</label>
                                    <div className="flex flex-wrap gap-2">
                                        {locations.map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => setLocation(l)}
                                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${location === l ? "bg-accent text-white shadow-md" : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={() => { setSearch(""); setType("All"); setLocation("All"); }}
                                        className="flex items-center gap-2 text-red-500 font-bold hover:underline"
                                    >
                                        <X size={18} /> Reset All
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results */}
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold mb-4">No properties found matching your criteria.</h3>
                        <p className="text-slate-500">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
