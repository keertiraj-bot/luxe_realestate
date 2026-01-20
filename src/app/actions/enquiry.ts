"use server";

import { supabase } from "@/lib/supabase";

export async function submitEnquiry(formData: FormData) {
    try {
        const name = formData.get("name")?.toString();
        const phone = formData.get("phone")?.toString();
        const message = formData.get("message")?.toString();
        const property_id = formData.get("property_id")?.toString();
        const city = formData.get("city")?.toString();
        const budget = formData.get("budget")?.toString();
        const service = formData.get("service")?.toString();

        if (!name || !phone || !message) {
            return { success: false, error: "Missing required fields" };
        }

        // Insert using the client
        const { error } = await supabase.from("buyer_enquiries").insert([
            {
                name,
                phone,
                message: `${message}${city ? ` | City: ${city}` : ""}${budget ? ` | Budget: ${budget}` : ""}${service ? ` | Service: ${service}` : ""}`,
                property_id: (property_id && property_id !== "undefined") ? property_id : null,
                // Add these if you have the columns:
                // city,
                // budget,
                // service
            }
        ]);

        if (error) {
            console.error("Supabase Error:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error("Server Action Exception:", err);
        return { success: false, error: "Server error occurred" };
    }
}

export async function getEnquiries() {
    try {
        const { data, error } = await supabase
            .from("buyer_enquiries")
            .select("*, properties(title)")
            .order("created_at", { ascending: false });

        if (error) {
            // Fallback for missing property relation
            const { data: simpleData, error: simpleError } = await supabase
                .from("buyer_enquiries")
                .select("*")
                .order("created_at", { ascending: false });

            return simpleError ? [] : simpleData;
        }
        return data || [];
    } catch (err) {
        return [];
    }
}

export async function deleteEnquiry(id: string) {
    try {
        const { error } = await supabase
            .from("buyer_enquiries")
            .delete()
            .eq("id", id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err) {
        return { success: false, error: "Failed to delete" };
    }
}
