import { ALL_PROPERTIES } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { Metadata } from "next";

interface Props {
    params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
    return {
        title: `Premium Properties in ${city} | Luxe Realty`,
        description: `Explore verified luxury villas, penthouses and plots in ${city}. Buy your dream home in ${city} with Luxe Realty's expert guidance.`,
    };
}

export default function CityPage({ params }: Props) {
    const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
    const properties = ALL_PROPERTIES.filter(p => p.location.toLowerCase() === params.city.toLowerCase());

    return (
        <div className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-12">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                        {city} <span className="text-accent underline decoration-slate-200 dark:decoration-slate-800 underline-offset-8">COLLECTION</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium">Fine real estate in the heart of {city}. Verified and curated for you.</p>
                </div>

                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white dark:bg-slate-900 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div className="text-center">
                            <h3 className="text-3xl font-black mb-4">Coming Soon to {city}</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">We are currently verifying exclusive listings in this location. Join our waitlist for first access.</p>
                            <button className="mt-8 px-10 py-4 bg-accent text-white rounded-full font-black shadow-lg shadow-accent/20">Join Waitlist</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
