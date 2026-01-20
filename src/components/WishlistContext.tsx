"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
    wishlist: string[];
    toggleWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("luxe_wishlist");
        if (saved) setWishlist(JSON.parse(saved));
    }, []);

    const toggleWishlist = (id: string) => {
        setWishlist((prev) => {
            const next = prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id];
            localStorage.setItem("luxe_wishlist", JSON.stringify(next));
            return next;
        });
    };

    const isInWishlist = (id: string) => wishlist.includes(id);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
