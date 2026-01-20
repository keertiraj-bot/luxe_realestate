"use client";

import Link from "next/link";
import { Home, Mail, MapPin, Phone, MessageSquare, Instagram, Facebook, Twitter, ShieldCheck, Star } from "lucide-react";

const FooterLinks = {
    Buy: [
        { name: "All Properties", href: "/properties" },
        { name: "Luxury Villas", href: "/properties?type=Villa" },
        { name: "Elite Penthouses", href: "/properties?type=Penthouse" },
        { name: "Verified Plots", href: "/properties?type=Plot" },
    ],
    Company: [
        { name: "About Us", href: "/about" },
        { name: "Why Us", href: "/#why-us" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Contact", href: "/contact" },
    ],
    Resources: [
        { name: "Buyer Guide", href: "/guides" },
        { name: "Legal Help", href: "/legal" },
        { name: "RERA Status", href: "/rera" },
        { name: "Admin Portal", href: "/admin/login" },
    ]
};

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white pt-32 pb-12 border-t border-slate-900 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                    <div className="max-w-xl space-y-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="p-3 bg-accent rounded-2xl group-hover:rotate-12 transition-transform shadow-2xl shadow-accent/20">
                                <Home className="text-white" size={32} />
                            </div>
                            <span className="text-4xl font-black tracking-tighter">LUXE<span className="text-accent">REALTY</span></span>
                        </Link>

                        <p className="text-2xl font-medium text-slate-400 leading-relaxed tracking-tight">
                            Crafting frictionless real estate experiences for the world's most <span className="text-white">discerning buyers.</span> Only verified, high-yield assets.
                        </p>

                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter, MessageSquare].map((Icon, i) => (
                                <Link key={i} href="#" className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-accent transition-all duration-500 border border-slate-800">
                                    <Icon size={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        {Object.entries(FooterLinks).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8">{title}</h4>
                                <ul className="space-y-4">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="text-slate-400 font-bold hover:text-white transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-slate-900 items-center">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Private Line</p>
                            <p className="font-black text-lg">+91 123 456 7890</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expert Support</p>
                            <p className="font-black text-lg">hello@luxerealty.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">HQ Office</p>
                            <p className="font-black text-lg">BKC, Mumbai - 400051</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8 opacity-40">
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em]"><ShieldCheck size={16} /> RERA Certified</div>
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em]"><Star size={16} /> 5-Star Rated</div>
                    </div>

                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-center md:text-right">
                        &copy; {new Date().getFullYear()} LUXE REALTY. ALL RIGHTS RESERVED. <br className="md:hidden" />
                        <span className="text-slate-400">DESIGN BY KEERTI SINH</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
