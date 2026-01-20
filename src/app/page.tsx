"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, CheckCircle, ShieldCheck, Star, Users, MessageCircle, Home as HomeIcon } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyCard from "@/components/PropertyCard";

// Mock data for initial fill
const featuredProperties = [
    {
        id: "1",
        title: "Skylight Penthouse",
        price: 45000000,
        location: "Worli, Mumbai",
        type: "Flat",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        area: "3200 sq.ft",
    },
    {
        id: "2",
        title: "Emerald Estate",
        price: 125000000,
        location: "Alibaug, MH",
        type: "House",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
        area: "8500 sq.ft",
    },
    {
        id: "3",
        title: "Urban Loft",
        price: 18000000,
        location: "Koramangala, Bangalore",
        type: "Flat",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
        area: "1800 sq.ft",
    }
];

export default function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Smooth reveal for sections
        const sections = document.querySelectorAll(".reveal-section");
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                }
            );
        });
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[90vh] lg:h-screen flex items-center justify-center overflow-hidden pt-20">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Home Background"
                        fill
                        className="object-cover brightness-[0.3]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-white font-bold text-sm tracking-widest uppercase shadow-2xl"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Premium Realty for Elite Buyers
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
                        >
                            OWING YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/80 to-accent/50">DREAM ESTATE</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                            Bypass the chaos. Access a verified collection of ultra-luxury penthouses, villas, and plots with direct manager support.
                        </motion.p>
                    </div>

                    {/* Hero Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="bg-white dark:bg-slate-900/90 p-4 md:p-8 rounded-[2.5rem] md:rounded-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-3xl flex flex-col md:flex-row items-center gap-6">

                            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">

                                <div className="px-6 py-2 group cursor-pointer">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1 group-hover:translate-x-1 transition-transform">Location</label>
                                    <select className="w-full bg-transparent border-none outline-none text-lg font-black text-slate-900 dark:text-white appearance-none cursor-pointer">
                                        <option>Mumbai, Maharashtra</option>
                                        <option>Bangalore, KA</option>
                                        <option>Pune, MH</option>
                                        <option>Goa</option>
                                    </select>
                                </div>

                                <div className="px-6 py-2 group cursor-pointer">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1 group-hover:translate-x-1 transition-transform">Budget Range</label>
                                    <select className="w-full bg-transparent border-none outline-none text-lg font-black text-slate-900 dark:text-white appearance-none cursor-pointer">
                                        <option>₹1Cr - ₹5Cr</option>
                                        <option>₹5Cr - ₹10Cr</option>
                                        <option>₹10Cr - ₹50Cr</option>
                                        <option>Unlimited Luxury</option>
                                    </select>
                                </div>

                                <div className="px-6 py-2 group cursor-pointer">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1 group-hover:translate-x-1 transition-transform">Property Type</label>
                                    <select className="w-full bg-transparent border-none outline-none text-lg font-black text-slate-900 dark:text-white appearance-none cursor-pointer">
                                        <option>Luxury Villa</option>
                                        <option>High-end Flat</option>
                                        <option>Private Plot</option>
                                        <option>Penthouse</option>
                                    </select>
                                </div>

                            </div>

                            <button className="w-full md:w-auto px-10 py-6 bg-accent text-white rounded-[2rem] md:rounded-full font-black text-xl shadow-2xl shadow-accent/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                Find Properties <ArrowRight size={24} />
                            </button>
                        </div>

                        <div className="flex justify-center gap-8 mt-12">
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 text-white/60">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <ShieldCheck size={20} className="text-accent" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider">Verified Listings</span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 text-white/60">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Users size={20} className="text-accent" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider">Direct Access</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: HomeIcon, label: "Properties", value: "1,200+" },
                        { icon: Users, label: "Happy Clients", value: "5,000+" },
                        { icon: ShieldCheck, label: "Verified Listings", value: "100%" },
                        { icon: Star, label: "Customer Rating", value: "4.9/5" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-2">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-accent">
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-3xl font-black">{stat.value}</h3>
                            <p className="text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Properties */}
            <section className="py-32 reveal-section">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-accent font-bold mb-4 uppercase tracking-widest text-sm">Best Selection</h2>
                            <h3 className="text-4xl md:text-5xl font-black mb-6">Handpicked Collections For You</h3>
                            <p className="text-slate-500 text-lg">
                                Discover exceptional homes that define luxury living. Each property is strictly verified for your peace of mind.
                            </p>
                        </div>
                        <Link href="/properties" className="text-accent font-bold flex items-center gap-2 group">
                            View All Properties <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-32 bg-white dark:bg-slate-950 reveal-section overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
                                    alt="Expert Advice"
                                    width={1000}
                                    height={1200}
                                    className="object-cover"
                                />
                            </motion.div>
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 z-20 max-w-xs"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <span className="font-black text-2xl">99%</span>
                                </div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Success Rate in Finding perfect buyer-match</p>
                            </motion.div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h2 className="text-accent font-black mb-4 uppercase tracking-[0.3em] text-xs">Why Choose Luxe Realty</h2>
                                <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">WE REPRESENT <span className="text-slate-200 dark:text-slate-800">THE BUYER.</span></h3>
                                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                                    Most agencies focus on selling. We focus on your acquisition. Our deep-market intelligence ensures you never overpay for luxury.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { title: "Off-Market Access", focus: "Hidden Gems", desc: "Get priority access to properties before they hit the public portals." },
                                    { title: "Legal Sovereignty", focus: "No Risk", desc: "Every plot and villa is veted by our in-house legal team for clean titles." },
                                    { title: "Price Shield", focus: "Best Deal", desc: "Our negotiation experts work exclusively to lower the price for you." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-6 group"
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-accent/20">
                                            <Star size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-xl font-black">{item.title}</h4>
                                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{item.focus}</span>
                                            </div>
                                            <p className="text-slate-500 font-medium">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-900 reveal-section">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-4">Elite Testimonials</h2>
                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter">VOICES OF TRUST</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Vikram Malhotra",
                                role: "CEO, TechSphere",
                                quote: "Finding a penthouse in Worli was stressful until I met Luxe Realty. Their direct approach saved me weeks of searching.",
                                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                            },
                            {
                                name: "Ananya Kapoor",
                                role: "Interior Architect",
                                quote: "The verification process is what impressed me most. They rejected 3 properties I liked because of minor title issues. True integrity.",
                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                            },
                            {
                                name: "Rajesh Singhania",
                                role: "HNWI Investor",
                                quote: "Bespoke service at its best. They understood my requirement for privacy and found an off-market villa in Alibaug within 10 days.",
                                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                            }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-white dark:bg-slate-800 rounded-[3rem] shadow-xl border border-white dark:border-slate-700 relative"
                            >
                                <div className="absolute -top-6 left-10">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-500" fill="currentColor" />)}
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-lg font-medium italic mb-8 leading-relaxed">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src={t.image} alt={t.name} width={60} height={60} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <h5 className="font-black text-slate-900 dark:text-white">{t.name}</h5>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Trust Badges placeholder logos would go here */}
                        <div className="text-3xl font-black tracking-tighter">Forbes RE</div>
                        <div className="text-3xl font-black tracking-tighter">BUREAU VERITAS</div>
                        <div className="text-3xl font-black tracking-tighter">TRUSTPILOT</div>
                        <div className="text-3xl font-black tracking-tighter">RERA CERTIFIED</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 reveal-section">
                <div className="container mx-auto px-6">
                    <div className="relative rounded-[3rem] bg-accent p-12 md:p-24 overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2" />
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Find Your <br /> Perfect Home?</h2>
                            <p className="text-white/80 text-xl mb-12">
                                Join thousands of happy homeowners who found their sanctuary through Luxe Realty.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <Link href="/contact" className="px-10 py-5 bg-white text-accent rounded-full font-bold text-lg shadow-xl hover:bg-slate-50 transition-all">
                                    Contact Support
                                </Link>
                                <Link href="/properties" className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg shadow-xl hover:bg-opacity-90 transition-all">
                                    Browse Catalog
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
