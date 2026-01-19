"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home } from "lucide-react";

const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "py-4 glass shadow-lg" : "py-6 bg-transparent"}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-accent rounded-lg group-hover:rotate-12 transition-transform">
                        <Home className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-gradient">LUXE REALTY</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-medium hover:text-accent transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/properties"
                        className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
                    >
                        Explore Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl p-6 md:hidden border-t"
                    >
                        <div className="flex flex-col gap-4">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/properties"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 bg-accent text-white text-center rounded-xl font-bold shadow-lg"
                            >
                                View Properties
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
