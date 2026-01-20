"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Maximize,
    Bed,
    Bath,
    CheckCircle2,
    Calendar,
    Tag,
    Share2,
    Heart,
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import WhatsAppButton from "@/components/WhatsAppButton";
import Map from "@/components/Map";
import { submitEnquiry } from "@/app/actions/enquiry";

// Mock function to simulate fetching - in reality this would fetch from Supabase
const getProperty = (id: string) => {
    return {
        id,
        title: "Skylight Penthouse",
        price: 45000000,
        location: "Worli, Mumbai",
        type: "Flat",
        description: "Experience the pinnacle of luxury living in this stunning Skylight Penthouse located in the heart of Worli. Offering breathtaking 360-degree views of the Arabian Sea and the city skyline, this home is designed for those who seek elegance and comfort. The property features high-end finishes, a private pool, and expansive terrace space.\n\nThe interiors are crafted with Italian marble, custom cabinetry, and state-of-the-art automation systems. Every room is designed to maximize natural light and ventilation.",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600607687940-c52af084399b?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
        ],
        bedrooms: 4,
        bathrooms: 4,
        area: "3200 sq.ft",
        amenities: ["Private Pool", "Home Automation", "Sea View", "4 Parking Spaces", "Gym", "Concierge"],
        latitude: 19.0176,
        longitude: 72.8172,
        created_at: "2024-01-15T10:00:00Z"
    };
};

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = getProperty(params.id);
    const [activeImage, setActiveImage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        formData.append("property_id", params.id);

        try {
            const res = await submitEnquiry(formData);
            if (res.success) {
                setSuccess(true);
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                setError(res.error || "Failed to send enquiry.");
            }
        } catch (err) {
            console.error("Property enquiry error:", err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-6">
                {/* Navigation Breadcrumb */}
                <div className="mb-8 flex items-center gap-4 text-slate-500">
                    <span className="hover:text-accent cursor-pointer transition-colors" onClick={() => window.history.back()}>Properties</span>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-bold">{property.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Gallery */}
                        <div className="space-y-4">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden group shadow-2xl"
                            >
                                <Image
                                    src={property.images[activeImage]}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-bottom p-10 pointer-events-none">
                                    <div className="mt-auto">
                                        <span className="px-4 py-2 bg-accent text-white rounded-full text-sm font-bold shadow-lg">
                                            {property.type}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {property.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative w-24 md:w-32 h-20 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all ${activeImage === i ? "ring-4 ring-accent" : "opacity-60 hover:opacity-100"}`}
                                    >
                                        <Image src={img} alt={`${property.title} ${i}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title & Stats */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-4">{property.title}</h1>
                                <div className="flex items-center gap-2 text-slate-500 text-lg">
                                    <MapPin className="text-accent" />
                                    {property.location}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-500 font-bold mb-1 uppercase tracking-widest text-xs">Total Price</p>
                                <h2 className="text-4xl font-black text-accent">{formatPrice(property.price)}</h2>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                                { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                                { icon: Maximize, label: "Total Area", value: property.area },
                                { icon: Calendar, label: "Listed on", value: new Date(property.created_at).toLocaleDateString() },
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex flex-col items-center text-center gap-2 border border-slate-100 dark:border-slate-800">
                                    <item.icon size={24} className="text-accent" />
                                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">{item.label}</span>
                                    <span className="font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black">About Property</h3>
                            <p className="text-slate-500 leading-relaxed text-lg whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800">
                                        <CheckCircle2 size={20} className="text-emerald-500" />
                                        <span className="font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black">Location on Map</h3>
                            <div className="h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                                <Map lat={property.latitude} lng={property.longitude} title={property.title} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Enquiry Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 glass dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 relative overflow-hidden">
                                <AnimatePresence>
                                    {success ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 z-10 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-8"
                                        >
                                            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h3 className="text-xl font-black mb-2">Request Received!</h3>
                                            <p className="text-slate-500 text-sm mb-6">Our property expert will contact you within 24 hours.</p>
                                            <button
                                                onClick={() => setSuccess(false)}
                                                className="text-accent font-bold text-sm underline"
                                            >
                                                Send Another
                                            </button>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>

                                <h3 className="text-2xl font-black mb-6">Interested?</h3>
                                <div className="space-y-6">
                                    <WhatsAppButton
                                        title={property.title}
                                        location={property.location}
                                        price={formatPrice(property.price)}
                                        className="w-full py-4 text-center justify-center text-lg"
                                    />

                                    <div className="relative flex items-center">
                                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                                        <span className="flex-shrink mx-4 text-slate-400 text-sm font-bold uppercase">Or Send Enquiry</span>
                                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                                        <div className="grid grid-cols-1 gap-4">
                                            <input name="name" required type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold" />
                                            <input name="phone" required type="tel" placeholder="Phone Number" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all font-bold" />

                                            <div className="grid grid-cols-2 gap-2">
                                                <label className="cursor-pointer">
                                                    <input type="radio" name="service" value="callback" defaultChecked className="hidden peer" />
                                                    <div className="py-3 text-center rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent transition-all font-bold text-xs uppercase tracking-widest">
                                                        Callback
                                                    </div>
                                                </label>
                                                <label className="cursor-pointer">
                                                    <input type="radio" name="service" value="sitevisit" className="hidden peer" />
                                                    <div className="py-3 text-center rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent transition-all font-bold text-xs uppercase tracking-widest">
                                                        Site Visit
                                                    </div>
                                                </label>
                                            </div>

                                            <textarea name="message" required rows={3} placeholder="Specific requirements or questions..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all resize-none font-bold"></textarea>
                                        </div>

                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full py-5 bg-accent text-white rounded-[2rem] font-black shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : "Request Details"}
                                        </button>
                                        <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">Direct access to relationship manager</p>
                                    </form>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800/50 flex items-start gap-4">
                                <div className="p-3 bg-emerald-500 text-white rounded-2xl">
                                    <Tag size={20} />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg">Best Price Guarantee</h4>
                                    <p className="text-emerald-700/70 dark:text-emerald-500 text-sm">Found a better deal? We'll match it and give you a gift voucher.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
