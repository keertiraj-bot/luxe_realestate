"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, LayoutDashboard, Building2, MessageSquare, LogOut, ChevronRight, Search, X, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";

interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"properties" | "enquiries">("properties");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dynamic property list for testing
    const [properties, setProperties] = useState<Property[]>([
        { id: "1", title: "Skylight Penthouse", price: 45000000, location: "Worli, Mumbai", type: "Flat" },
        { id: "2", title: "Emerald Estate", price: 125000000, location: "Alibaug", type: "House" },
    ]);

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("is_admin");
        if (adminToken !== "true") {
            router.push("/admin/login");
        } else {
            setIsLoggedIn(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("is_admin");
        router.push("/admin/login");
    };

    const handleAddProperty = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const newProperty: Property = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.get("title") as string,
            price: Number(formData.get("price")),
            location: formData.get("location") as string,
            type: formData.get("type") as string,
        };

        // Simulate API call
        setTimeout(() => {
            setProperties([newProperty, ...properties]);
            setLoading(false);
            setIsModalOpen(false);
            alert("Property Added Successfully!");
        }, 1500);
    };

    const deleteProperty = (id: string) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col">
                <div className="mb-12 flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                        <LayoutDashboard className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-black tracking-tighter">ADMIN PANEL</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    <button
                        onClick={() => setActiveTab("properties")}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === "properties" ? "bg-accent text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`}
                    >
                        <Building2 size={20} />
                        Properties
                    </button>
                    <button
                        onClick={() => setActiveTab("enquiries")}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === "enquiries" ? "bg-accent text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`}
                    >
                        <MessageSquare size={20} />
                        Enquiries
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black mb-2 capitalize">{activeTab}</h1>
                        <p className="text-slate-500">Manage your real estate operations.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search..." className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 rounded-xl border-none outline-none ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-accent w-64" />
                        </div>
                        {activeTab === "properties" && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
                            >
                                <Plus size={20} /> Add Property
                            </button>
                        )}
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "properties" ? (
                        <motion.div
                            key="properties"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid gap-6"
                        >
                            {properties.map((property) => (
                                <div key={property.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                                        <ImageIcon size={32} />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                                        <p className="text-slate-400 text-sm">{property.location}</p>
                                        <span className="text-xs font-bold uppercase text-accent mt-2 inline-block">{property.type}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-accent mb-2">{formatPrice(property.price)}</p>
                                        <div className="flex gap-2 justify-end">
                                            <button className="p-2 text-slate-400 hover:text-accent transition-colors"><ChevronRight size={20} /></button>
                                            <button
                                                onClick={() => deleteProperty(property.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="enquiries"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
                        >
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-8 py-5 font-black text-xs uppercase tracking-wider text-slate-500">Date</th>
                                        <th className="px-8 py-5 font-black text-xs uppercase tracking-wider text-slate-500">Buyer</th>
                                        <th className="px-8 py-5 font-black text-xs uppercase tracking-wider text-slate-500">Property</th>
                                        <th className="px-8 py-5 font-black text-xs uppercase tracking-wider text-slate-500">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6 text-sm text-slate-500">24 Jan 2024</td>
                                            <td className="px-8 py-6">
                                                <p className="font-bold">Rahul Sharma</p>
                                                <p className="text-slate-400 text-xs">+91 9876543210</p>
                                            </td>
                                            <td className="px-8 py-6 font-medium">Emerald Estate</td>
                                            <td className="px-8 py-6">
                                                <button className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-xs font-bold hover:bg-accent hover:text-white transition-all">View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Add Property Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black">Add New Property</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleAddProperty} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Property Title</label>
                                        <input name="title" required type="text" placeholder="e.g. Sunset Heights" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Price (INR)</label>
                                        <input name="price" required type="number" placeholder="45000000" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Location</label>
                                        <input name="location" required type="text" placeholder="Worli, Mumbai" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Property Type</label>
                                        <select name="type" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">
                                            <option value="Flat">Flat</option>
                                            <option value="House">House</option>
                                            <option value="Plot">Plot</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-400 ml-2">Description</label>
                                    <textarea name="description" rows={4} placeholder="Tell buyers about this property..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all resize-none"></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-grow py-5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="flex-grow py-5 bg-accent text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : "Publish Listing"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
