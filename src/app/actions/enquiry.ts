"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

function getSupabaseClient() {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}

export async function submitEnquiry(formData: FormData) {
    const supabase = getSupabaseClient();

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
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from("buyer_enquiries")
        .select("*, properties(title)")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}
