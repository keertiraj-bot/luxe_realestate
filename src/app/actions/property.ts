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

export async function createProperty(formData: FormData) {
    const supabase = getSupabaseClient();

    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const area = formData.get("area") as string;
    const amenities = (formData.get("amenities") as string).split(",").map(s => s.trim());

    // Note: Handling images would require a storage bucket upload session here.
    // For simplicity in this demo, we'll store URLs or placeholders.

    const { data, error } = await supabase.from("properties").insert([
        { title, price, location, type, description, area, amenities }
    ]);

    if (error) throw error;

    revalidatePath("/properties");
    revalidatePath("/admin/dashboard");
    return { success: true };
}

export async function deleteProperty(id: string) {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/properties");
    revalidatePath("/admin/dashboard");
    return { success: true };
}
