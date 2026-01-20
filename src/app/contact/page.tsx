"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { submitEnquiry } from "@/app/actions/enquiry";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        try {
            const res = await submitEnquiry(formData);
            if (res.success) {
                setSuccess(true);
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                setError(res.error || "Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error("Enquiry submission error:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

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
                            className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-50 dark:border-slate-800 relative overflow-hidden"
                        >
                            <AnimatePresence>
                                {success ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 z-10 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-10"
                                    >
                                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
                                        <p className="text-slate-500 mb-8 text-lg">Thank you for your interest. Our executive will call you shortly.</p>
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="px-8 py-3 bg-accent text-white rounded-xl font-bold shadow-lg shadow-accent/20"
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-100 text-red-600 rounded-xl text-sm font-black uppercase tracking-widest border border-red-200">
                                        {error}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Full Name</label>
                                        <input name="name" required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-bold" placeholder="Vikram Malhotra" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Phone Number</label>
                                        <input name="phone" required type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-bold" placeholder="+91 99999 99999" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">City / Area</label>
                                        <input name="city" required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-bold" placeholder="Bandra, Mumbai" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Planned Budget</label>
                                        <select name="budget" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-bold appearance-none">
                                            <option>₹1 Cr - ₹5 Cr</option>
                                            <option>₹5 Cr - ₹10 Cr</option>
                                            <option>₹10 Cr+</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Service Required</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="service" value="callback" defaultChecked className="hidden peer" />
                                            <div className="py-4 text-center rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent transition-all font-bold text-sm">
                                                Request Callback
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input type="radio" name="service" value="sitevisit" className="hidden peer" />
                                            <div className="py-4 text-center rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent transition-all font-bold text-sm">
                                                Schedule Site Visit
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Your Requirements</label>
                                    <textarea name="message" required rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none font-bold" placeholder="Specific requirements (e.g. Sea View, Vastu Compliant)..."></textarea>
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-6 bg-accent text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-accent/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                                    {loading ? "Processing..." : "Submit Enquiry"}
                                </button>
                                <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Response time typically under 15 minutes</p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
