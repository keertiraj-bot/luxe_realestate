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

export async function getProperties() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Fetch Properties Error:", error);
        return [];
    }
    return data;
}

export async function createProperty(formData: FormData) {
    const supabase = getSupabaseClient();

    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const area = formData.get("area") as string;
    const amenities = (formData.get("amenities") as string || "").split(",").map(s => s.trim());

    const { data, error } = await supabase.from("properties").insert([
        { title, price, location, type, description, area, amenities }
    ]);

    if (error) {
        console.error("Create Property Error:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/properties");
    revalidatePath("/admin/dashboard");
    return { success: true };
}

export async function updateProperty(id: string, formData: FormData) {
    const supabase = getSupabaseClient();

    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const area = formData.get("area") as string;
    const amenities = (formData.get("amenities") as string || "").split(",").map(s => s.trim());

    const { error } = await supabase
        .from("properties")
        .update({ title, price, location, type, description, area, amenities })
        .eq("id", id);

    if (error) {
        console.error("Update Property Error:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/properties");
    revalidatePath(`/properties/${id}`);
    revalidatePath("/admin/dashboard");
    return { success: true };
}

export async function deleteProperty(id: string) {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) {
        console.error("Delete Property Error:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/properties");
    revalidatePath("/admin/dashboard");
    return { success: true };
}
