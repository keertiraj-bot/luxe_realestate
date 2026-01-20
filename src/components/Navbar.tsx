"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, MessageSquare, Phone } from "lucide-react";

const NavLinks = [
    { name: "Buy", href: "/properties" },
    { name: "Luxury", href: "/properties?type=Villa" },
    { name: "Budget", href: "/properties?maxPrice=20000000" },
    { name: "Featured", href: "/properties?featured=true" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                    ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border-b border-slate-200/50 dark:border-slate-800/50"
                    : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-accent rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20">
                        <Home className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                        LUXE<span className="text-accent">REALTY</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex items-center gap-6 bg-slate-100/50 dark:bg-slate-800/50 px-6 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                        {NavLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors uppercase tracking-widest px-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="https://wa.me/911234567890"
                            target="_blank"
                            className="hidden xl:flex items-center gap-2 px-5 py-2.5 bg-whatsapp text-white rounded-full font-bold text-sm shadow-lg shadow-whatsapp/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            <MessageSquare size={16} />
                            WhatsApp
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Enquire Now
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[-1] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[-1] lg:hidden flex flex-col pt-24 pb-12 px-8"
                        >
                            <div className="flex flex-col gap-6 flex-grow">
                                {NavLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-black text-slate-900 dark:text-white hover:text-accent transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href="tel:+911234567890"
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold border border-slate-200 dark:border-slate-700"
                                >
                                    <Phone size={20} /> Call Support
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-accent text-white rounded-2xl font-bold shadow-2xl shadow-accent/30"
                                >
                                    Book Site Visit
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
