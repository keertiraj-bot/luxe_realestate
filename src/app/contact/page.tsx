"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Get in Touch</h1>
                        <p className="text-slate-500 text-lg">
                            Have questions about a property or need guidance? Our team is here to help you find your perfect home.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase">Call us</p>
                                            <p className="font-bold">+91 123 456 7890</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase">Email us</p>
                                            <p className="font-bold">support@luxerealty.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase">Visit us</p>
                                            <p className="font-bold">123 Realty Tower, BKC, Mumbai</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold mb-4">Chat with an Expert</h3>
                                <p className="text-slate-500 mb-6">Want instant answers? Connect with us directly on WhatsApp for a personalized session.</p>
                                <WhatsAppButton title="Contact Support" location="Contact Page" price="General" className="w-full justify-center" />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-50 dark:border-slate-800"
                        >
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Full Name</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Email Address</label>
                                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Phone Number</label>
                                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="+91 XXX XXX XXXX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Message</label>
                                    <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all resize-none" placeholder="Tell us what you're looking for..."></textarea>
                                </div>
                                <button type="submit" className="w-full py-5 bg-accent text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
