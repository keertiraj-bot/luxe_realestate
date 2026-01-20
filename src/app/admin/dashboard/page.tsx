"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, LayoutDashboard, Building2, MessageSquare, LogOut, ChevronRight, Search, X, Loader2, Image as ImageIcon, Edit2, MapPin, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { getProperties, createProperty, updateProperty, deleteProperty } from "@/app/actions/property";
import { getEnquiries } from "@/app/actions/enquiry";

interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
    description?: string;
    area?: string;
    amenities?: string[];
}

interface Enquiry {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    message: string;
    properties?: {
        title: string;
    };
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"properties" | "enquiries">("properties");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [properties, setProperties] = useState<Property[]>([]);
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("is_admin");
        if (adminToken !== "true") {
            router.push("/admin/login");
        } else {
            setIsLoggedIn(true);
            fetchData();
        }
    }, [router]);

    const fetchData = async () => {
        setFetching(true);
        setError(null);
        try {
            const [propData, enqData] = await Promise.all([
                getProperties(),
                getEnquiries()
            ]);
            setProperties(propData || []);
            setEnquiries(enqData || []);
        } catch (err: any) {
            console.error("Fetch Data Error:", err);
            setError("Database connection error. Check Supabase keys.");
        } finally {
            setFetching(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("is_admin");
        router.push("/admin/login");
    };

    const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            let res;
            if (editingProperty) {
                res = await updateProperty(editingProperty.id, formData);
            } else {
                res = await createProperty(formData);
            }

            if (res.success) {
                await fetchData();
                setIsModalOpen(false);
                setEditingProperty(null);
                alert(editingProperty ? "Updated Successfully!" : "Added Successfully!");
            } else {
                alert("Error: " + res.error);
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setLoading(true);
            try {
                const res = await deleteProperty(id);
                if (res.success) {
                    await fetchData();
                } else {
                    alert("Error deleting");
                }
            } catch (err) {
                alert("Error");
            } finally {
                setLoading(false);
            }
        }
    };

    const openEditModal = (property: Property) => {
        setEditingProperty(property);
        setIsModalOpen(true);
    };

    if (!isLoggedIn) return null;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            {/* Sidebar */}
            <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col fixed h-full z-20">
                <div className="mb-12 flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-accent to-accent/80 rounded-xl shadow-lg shadow-accent/20">
                        <LayoutDashboard className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">LUXE ADMIN</span>
                </div>

                <nav className="space-y-3 flex-grow">
                    <button
                        onClick={() => setActiveTab("properties")}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "properties" ? "bg-accent text-white shadow-xl shadow-accent/30 translate-x-1" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    >
                        <Building2 size={22} />
                        Properties
                    </button>
                    <button
                        onClick={() => setActiveTab("enquiries")}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "enquiries" ? "bg-accent text-white shadow-xl shadow-accent/30 translate-x-1" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    >
                        <MessageSquare size={22} />
                        Enquiries
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 mt-auto"
                >
                    <LogOut size={22} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="ml-80 flex-grow p-12 overflow-y-auto min-h-screen">
                <header className="flex justify-between items-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl font-black mb-3 capitalize text-slate-900 dark:text-white">{activeTab}</h1>
                        <p className="text-slate-500 text-lg">Manage your premium real estate portfolio and buyer requests.</p>
                    </motion.div>
                    <div className="flex gap-4">
                        {activeTab === "properties" && (
                            <button
                                onClick={() => { setEditingProperty(null); setIsModalOpen(true); }}
                                className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
                            >
                                <Plus size={24} /> New Project
                            </button>
                        )}
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {error && (
                        <div className="mb-8 p-6 bg-red-50 text-red-600 rounded-[2rem] border border-red-100 font-bold flex items-center gap-4">
                            <X className="bg-red-600 text-white rounded-full p-1" size={24} />
                            {error}
                            <button onClick={fetchData} className="ml-auto underline">Try Again</button>
                        </div>
                    )}
                    {fetching ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-accent" size={48} />
                            <p className="text-slate-400 font-medium">Synchronizing with Server...</p>
                        </div>
                    ) : activeTab === "properties" ? (
                        <motion.div
                            key="properties"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
                        >
                            {properties.length === 0 ? (
                                <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <Building2 className="mx-auto text-slate-200 mb-4" size={64} />
                                    <p className="text-slate-400 text-xl font-bold">No properties found. Start by adding one!</p>
                                </div>
                            ) : properties.map((property) => (
                                <motion.div
                                    layout
                                    key={property.id}
                                    className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-full sm:w-40 h-40 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 group-hover:bg-accent/5 transition-colors overflow-hidden">
                                        <ImageIcon size={48} />
                                    </div>
                                    <div className="flex-grow w-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">{property.type}</span>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{property.title}</h3>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <MapPin size={16} />
                                                    <span className="text-sm font-medium">{property.location}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-end gap-1">
                                                    <IndianRupee size={20} className="text-accent" />
                                                    {formatPrice(property.price).replace('₹', '')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 justify-end mt-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                                            <button
                                                onClick={() => openEditModal(property)}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300"
                                            >
                                                <Edit2 size={16} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="enquiries"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="space-y-6"
                        >
                            {enquiries.length === 0 ? (
                                <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
                                    <MessageSquare className="mx-auto text-slate-200 mb-6" size={64} />
                                    <p className="text-slate-400 text-2xl font-bold">No buyer enquiries present.</p>
                                    <p className="text-slate-500 mt-2">Marketing campaigns may help attract potential buyers.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    {enquiries.map((enq) => (
                                        <motion.div
                                            key={enq.id}
                                            layout
                                            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 relative group"
                                        >
                                            <div className="absolute top-0 left-0 w-2 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-l-[2.5rem]" />

                                            <div className="flex-shrink-0 w-full md:w-48 text-center md:text-left">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Received On</p>
                                                <p className="text-lg font-black text-slate-900 dark:text-white">
                                                    {new Date(enq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                </p>
                                                <p className="text-xs font-bold text-slate-400">
                                                    {new Date(enq.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>

                                            <div className="flex-grow w-full">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                                <Search size={14} />
                                                            </div>
                                                            <h3 className="text-xl font-black text-slate-900 dark:text-white capitalize">{enq.name}</h3>
                                                        </div>
                                                        <p className="text-accent font-black tracking-wider text-sm">{enq.phone}</p>
                                                    </div>

                                                    <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Inquiry For</span>
                                                        <span className="font-bold text-slate-700 dark:text-slate-300">
                                                            {enq.properties?.title || "Direct Website"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50 relative">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">Message / Mass</span>
                                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                                                        "{enq.message}"
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                                                <button
                                                    onClick={() => window.open(`tel:${enq.phone}`)}
                                                    className="flex-grow md:flex-grow-0 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                                    title="Call Buyer"
                                                >
                                                    <Phone size={20} className="mx-auto" />
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        if (confirm("Permanently delete this enquiry?")) {
                                                            const { deleteEnquiry } = await import("@/app/actions/enquiry");
                                                            setLoading(true);
                                                            const res = await deleteEnquiry(enq.id);
                                                            if (res.success) fetchData();
                                                            setLoading(false);
                                                        }
                                                    }}
                                                    className="flex-grow md:flex-grow-0 p-4 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={20} className="mx-auto" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Property Modal (Add/Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsModalOpen(false); setEditingProperty(null); }}
                            className="absolute inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 40 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] p-12 overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                                        {editingProperty ? "Edit Listing" : "Create New Listing"}
                                    </h2>
                                    <p className="text-slate-400 font-medium mt-1">Fill in the details to showcase this ultra-luxury property.</p>
                                </div>
                                <button
                                    onClick={() => { setIsModalOpen(false); setEditingProperty(null); }}
                                    className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl transition-all text-slate-400 group"
                                >
                                    <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            <form onSubmit={handleAction} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Property Display Title</label>
                                        <input
                                            defaultValue={editingProperty?.title}
                                            name="title" required type="text"
                                            placeholder="e.g. Royal Horizon Villas"
                                            className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold placeholder:font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Investment Price (INR)</label>
                                        <input
                                            defaultValue={editingProperty?.price}
                                            name="price" required type="number"
                                            placeholder="Price in numerals..."
                                            className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold placeholder:font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Geographic Location</label>
                                        <input
                                            defaultValue={editingProperty?.location}
                                            name="location" required type="text"
                                            placeholder="City, Neighborhood..."
                                            className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold placeholder:font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Property Category</label>
                                        <select
                                            defaultValue={editingProperty?.type}
                                            name="type"
                                            className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold appearance-none cursor-pointer"
                                        >
                                            <option value="Penthouse">Penthouse</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Mansion">Mansion</option>
                                            <option value="Plot">Private Land</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Total Area (sq ft)</label>
                                        <input
                                            defaultValue={editingProperty?.area}
                                            name="area" type="text"
                                            placeholder="e.g. 12,000 sq ft"
                                            className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold placeholder:font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Amenities (Comma separated)</label>
                                        <input
                                            defaultValue={editingProperty?.amenities?.join(", ")}
                                            name="amenities" type="text"
                                            placeholder="Pool, Spa, Helipad..."
                                            className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold placeholder:font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Property Narrative (Description)</label>
                                    <textarea
                                        defaultValue={editingProperty?.description}
                                        name="description" rows={5}
                                        placeholder="Craft a compelling story about this property..."
                                        className="w-full px-8 py-5 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-accent transition-all text-lg font-bold placeholder:font-medium resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex gap-6 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => { setIsModalOpen(false); setEditingProperty(null); }}
                                        className="flex-grow py-6 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-black text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase tracking-widest text-sm"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="flex-grow py-6 bg-accent text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-accent/40 hover:scale-[1.02] transition-all hover:bg-opacity-90 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : editingProperty ? "Save Changes" : "Confirm & Publish"}
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
