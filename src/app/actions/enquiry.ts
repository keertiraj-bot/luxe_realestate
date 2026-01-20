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

    // Log the data we are trying to insert
    console.log("Submitting enquiry:", { property_id, name, phone, message });

    const { data, error } = await supabase.from("buyer_enquiries").insert([
        {
            property_id: property_id || null,
            name,
            phone,
            message
        }
    ]).select();

    if (error) {
        console.error("Enquiry Insertion Error:", error);
        return { success: false, error: error.message };
    }

    console.log("Enquiry submitted successfully:", data);
    revalidatePath("/admin/dashboard");
    return { success: true };
}

export async function getEnquiries() {
    const supabase = getSupabaseClient();

    console.log("Fetching enquiries from Supabase...");

    const { data, error } = await supabase
        .from("buyer_enquiries")
        .select("*, properties(title)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Fetch Enquiries Error:", error);
        // If error is because properties table relation doesn't exist, try fetching without it
        if (error.code === "PGRST204" || error.message.includes("properties")) {
            const { data: simpleData, error: simpleError } = await supabase
                .from("buyer_enquiries")
                .select("*")
                .order("created_at", { ascending: false });

            if (simpleError) {
                console.error("Final Fetch Attempt Failed:", simpleError);
                return [];
            }
            return simpleData;
        }
        return [];
    }

    console.log(`Fetched ${data?.length || 0} enquiries`);
    return data;
}

export async function deleteEnquiry(id: string) {
    const supabase = getSupabaseClient();

    const { error } = await supabase
        .from("buyer_enquiries")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Delete Enquiry Error:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
}
