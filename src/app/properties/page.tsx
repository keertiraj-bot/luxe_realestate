"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ArrowUpDown, LayoutGrid, List } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

import { ALL_PROPERTIES } from "@/lib/data";

export default function PropertiesPage() {
    const [filteredProperties, setFilteredProperties] = useState(ALL_PROPERTIES);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("All");
    const [location, setLocation] = useState("All");
    const [maxPrice, setMaxPrice] = useState(200000000);
    const [beds, setBeds] = useState("Any");
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        let results = [...ALL_PROPERTIES];

        if (search) {
            results = results.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.location.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (type !== "All") results = results.filter(p => p.type === type);
        if (location !== "All") results = results.filter(p => p.location === location);
        if (beds !== "Any") {
            const count = parseInt(beds);
            results = results.filter(p => p.bedrooms >= count);
        }
        results = results.filter(p => p.price <= maxPrice);

        // Sorting
        results.sort((a, b) => {
            if (sortBy === "price_low") return a.price - b.price;
            if (sortBy === "price_high") return b.price - a.price;
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        setFilteredProperties(results);
    }, [search, type, location, maxPrice, beds, sortBy]);

    const locations = ["All", ...Array.from(new Set(ALL_PROPERTIES.map(p => p.location)))];
    const types = ["All", "Flat", "House", "Plot"];
    const bedOptions = ["Any", "1+", "2+", "3+", "4+"];

    return (
        <div className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-4xl mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        CURATED <span className="text-accent underline decoration-slate-200 dark:decoration-slate-800 underline-offset-8">COLLECTIONS</span>
                    </motion.h1>
                    <p className="text-slate-500 text-xl font-medium">Explore premium listings, handpicked for quality and value.</p>
                </div>

                {/* Main Filter Bar */}
                <div className="sticky top-24 z-30 mb-12">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full lg:w-auto">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search neighborhood or project name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold text-lg"
                            />
                        </div>

                        <div className="flex gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex-grow lg:flex-grow-0 flex items-center justify-center gap-2 px-8 py-5 rounded-3xl font-black transition-all ${showFilters ? "bg-accent text-white shadow-xl shadow-accent/30" : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100"}`}
                            >
                                <SlidersHorizontal size={20} />
                                Filters
                                {(type !== "All" || location !== "All" || beds !== "Any") && <span className="w-2 h-2 rounded-full bg-white ml-1 animate-pulse" />}
                            </button>

                            <div className="relative group flex-grow lg:flex-grow-0">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-8 pr-12 py-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl font-black appearance-none outline-none cursor-pointer border-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                </select>
                                <ArrowUpDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-12 overflow-hidden"
                        >
                            <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-accent">Property Context</label>
                                    <div className="flex flex-wrap gap-2">
                                        {types.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setType(t)}
                                                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${type === t ? "bg-accent text-white shadow-lg" : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-accent">Preferred Cities</label>
                                    <div className="flex flex-wrap gap-2">
                                        {locations.map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => setLocation(l)}
                                                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${location === l ? "bg-accent text-white shadow-lg" : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"}`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-accent">Min Bedrooms</label>
                                    <div className="flex flex-wrap gap-2">
                                        {bedOptions.map((b) => (
                                            <button
                                                key={b}
                                                onClick={() => setBeds(b)}
                                                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${beds === b ? "bg-accent text-white shadow-lg" : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"}`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-accent">Price Cap {(maxPrice / 10000000).toFixed(1)} Cr</label>
                                        <button
                                            onClick={() => { setSearch(""); setType("All"); setLocation("All"); setBeds("Any"); setMaxPrice(200000000); }}
                                            className="text-[10px] font-black text-red-500 uppercase hover:underline"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    <input
                                        type="range"
                                        min="10000000"
                                        max="200000000"
                                        step="5000000"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                        <span>₹1 Cr</span>
                                        <span>₹20 Cr</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Section */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                        Showing <span className="text-slate-900 dark:text-white">{filteredProperties.length}</span> Premium Results
                    </p>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-accent"><LayoutGrid size={18} /></button>
                        <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400"><List size={18} /></button>
                    </div>
                </div>

                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 bg-white dark:bg-slate-900 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                    >
                        <Search size={64} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-3xl font-black mb-4">No Listings Match Your Vision</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">Our advisors can find off-market properties for you. Start a private consultation today.</p>
                        <button className="mt-8 px-10 py-4 bg-accent text-white rounded-full font-black shadow-lg shadow-accent/20">Talk to an Advisor</button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
