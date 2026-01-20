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
                e.currentTarget.reset();
            } else {
                setError(res.error || "Failed to send message. Please try again.");
            }
        } catch (err) {
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
                                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold">
                                        {error}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Full Name</label>
                                    <input name="name" required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Phone Number</label>
                                    <input name="phone" required type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all" placeholder="+91 XXX XXX XXXX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Message</label>
                                    <textarea name="message" required rows={5} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all resize-none" placeholder="Tell us what you're looking for..."></textarea>
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-5 bg-accent text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
