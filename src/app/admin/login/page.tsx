"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser"; // We'll create this lib
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Temporary mock login for development if keys are placeholders
        if (email === "admin@luxerealty.com" && password === "admin123") {
            // In a real app, use Supabase Auth
            localStorage.setItem("is_admin", "true");
            router.push("/admin/dashboard");
            return;
        }

        setError("Invalid credentials. (Demo: admin@luxerealty.com / admin123)");
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                        <Lock size={30} />
                    </div>
                    <h1 className="text-3xl font-black mb-2">Admin Portal</h1>
                    <p className="text-slate-500">Only authorized personnel can access.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all"
                                placeholder="admin@luxerealty.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-accent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
