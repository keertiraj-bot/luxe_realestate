"use server";

import { createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll() } }
    );

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
    const cookieStore = cookies();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll() } }
    );

    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/properties");
    revalidatePath("/admin/dashboard");
    return { success: true };
}
