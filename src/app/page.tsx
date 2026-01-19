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
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Home"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 inline-block px-4 py-1 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md text-accent font-medium text-sm"
                    >
                        Trusted by 5,000+ Happy Buyers
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter"
                    >
                        Find Your <span className="text-accent">Dream</span> Home <br className="hidden md:block" /> with Ease.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
                    >
                        Explore a curated collection of premium properties. Verified listings, direct WhatsApp enquiries, and dedicated buyer support.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link
                            href="/properties"
                            className="px-10 py-5 bg-accent text-white rounded-full font-bold text-lg shadow-2xl hover:bg-opacity-90 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            Explore Properties <ArrowRight size={20} />
                        </Link>
                        <WhatsAppButton
                            title="General Inquiry"
                            location="Luxe Realty"
                            price="N/A"
                            className="px-10 py-5 text-lg"
                        />
                    </motion.div>
                </div>

                {/* Floating scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </motion.div>
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

            {/* Benefits Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-800/50 reveal-section">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Why Choose Luxe Realty?</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            We focus exclusively on the buyer experience, ensuring you get the best deal with maximum transparency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Buyer-First Approach",
                                desc: "No hidden charges, no seller-favored deals. We represent you.",
                                icon: CheckCircle
                            },
                            {
                                title: "Strict Verification",
                                desc: "Every listing goes through a 50-point quality and legal check.",
                                icon: ShieldCheck
                            },
                            {
                                title: "Direct WhatsApp Access",
                                desc: "Connect instantly with property managers without any delay.",
                                icon: MessageCircle
                            }
                        ].map((benefit, i) => (
                            <div key={i} className="p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all group">
                                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 text-white group-hover:rotate-12 transition-transform">
                                    {/* @ts-ignore */}
                                    <benefit.icon size={30} />
                                </div>
                                <h4 className="text-2xl font-bold mb-4">{benefit.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
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
