"use server";

import { createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitEnquiry(formData: FormData) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Public action, no auth required usually (or basic rate limiting)
    const supabase = createClient(supabaseUrl, supabaseKey, {
        cookies: { getAll: () => [] }
    });

    const property_id = formData.get("property_id") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("buyer_enquiries").insert([
        { property_id, name, phone, message }
    ]);

    if (error) {
        console.error("Enquiry Error:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function getEnquiries() {
    const cookieStore = cookies();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll() } }
    );

    const { data, error } = await supabase
        .from("buyer_enquiries")
        .select("*, properties(title)")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}
