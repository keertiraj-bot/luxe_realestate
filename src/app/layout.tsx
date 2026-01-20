import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Luxe Realty | Premium Real Estate for Elite Buyers",
    description: "Discover verified luxury penthouses, villas, and plots in Mumbai, Bangalore, and Goa. Buyer-focused real estate with direct WhatsApp access and legal verification.",
    keywords: ["Luxury Real Estate India", "Verified Properties", "Premium Villas Mumbai", "Elite Penthouses Bangalore", "Real Estate Buyer Agent"],
    openGraph: {
        title: "Luxe Realty | Premium Real Estate for Elite Buyers",
        description: "Verified luxury properties with direct expert access.",
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Luxe Realty",
                            "url": "https://luxerealty.com",
                            "logo": "https://luxerealty.com/logo.png",
                            "sameAs": [
                                "https://facebook.com/luxerealty",
                                "https://instagram.com/luxerealty"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+91-1234567890",
                                "contactType": "customer service"
                            }
                        })
                    }}
                />
            </head>
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
