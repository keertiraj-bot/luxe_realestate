"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapProps {
    lat: number;
    lng: number;
    title: string;
}

export default function Map({ lat, lng, title }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } = (await loader.importLibrary(
                "marker"
            )) as google.maps.MarkerLibrary;

            const position = { lat, lng };

            const map = new Map(mapRef.current as HTMLElement, {
                center: position,
                zoom: 15,
                mapId: "DEMO_MAP_ID", // Change this to your custom Map ID for styling
                disableDefaultUI: true,
                zoomControl: true,
            });

            new AdvancedMarkerElement({
                map,
                position,
                title,
            });
        };

        if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
            initMap();
        }
    }, [lat, lng, title]);

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === "AIzaPlaceholder") {
        return (
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-10 text-center">
                <div>
                    <p className="text-slate-500 font-bold mb-2">Google Maps Key Missing</p>
                    <p className="text-sm text-slate-400">Please provide a valid API key in .env.local to see the map.</p>
                    <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-xl text-xs font-mono">
                        Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
                    </div>
                </div>
            </div>
        );
    }

    return <div ref={mapRef} className="w-full h-full" />;
}
