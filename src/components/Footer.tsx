import Link from "next/link";
import { Home, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Home className="text-accent" size={28} />
                        <span className="text-2xl font-bold tracking-tighter">LUXE REALTY</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                        Finding your perfect home shouldn't be hard. We connect buyers with premium, verified properties across the best locations.
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                        <li><Link href="/properties" className="hover:text-accent transition-colors">Featured Properties</Link></li>
                        <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                        <li><Link href="/admin/login" className="hover:text-accent transition-colors">Admin Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6">Locations</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li>Mumbai, Maharashtra</li>
                        <li>Bangalore, Karnataka</li>
                        <li>Pune, Maharashtra</li>
                        <li>Delhi NCR</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6">Contact</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li className="flex items-center gap-2">
                            <Phone size={18} className="text-accent" />
                            <span>+91 123 456 7890</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={18} className="text-accent" />
                            <span>hello@luxerealty.com</span>
                        </li>
                        <li className="flex items-center gap-2 leading-relaxed">
                            <MapPin size={18} className="text-accent flex-shrink-0" />
                            <span>123 Realty Tower, BKC, Mumbai - 400051</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Luxe Realty. All rights reserved. Design by KEERTI SINH
            </div>
        </footer>
    );
}
