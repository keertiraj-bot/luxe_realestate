import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}

export function getWhatsAppLink(title: string, location: string, price: string) {
    const number = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "911234567890";
    const message = `Hello, I want to buy this property:\n\nProperty: ${title}\nLocation: ${location}\nBudget: ${price}\n\nPlease contact me.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
