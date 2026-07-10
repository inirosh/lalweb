"use server";

// Server actions for managing product categories (admin only).
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { createSupabaseServer } from "@/lib/supabase/serverClient";

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readForm(formData) {
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  return {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    sort_order: parseInt(formData.get("sort_order") || "0", 10) || 0,
  };
}

function refresh() {
  revalidatePath("/admin/categories");
  revalidatePath("/");
  revalidatePath("/products");
}

export async function createCategory(prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  if (!values.name || !values.slug) return { error: "Category name is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("categories").insert(values);
  if (error)
    return {
      error: error.message.includes("duplicate")
        ? "A category with this name/web address already exists."
        : "Could not save category: " + error.message,
    };
  refresh();
  redirect("/admin/categories?saved=1");
}

export async function updateCategory(id, prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  if (!values.name || !values.slug) return { error: "Category name is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("categories").update(values).eq("id", id);
  if (error)
    return {
      error: error.message.includes("duplicate")
        ? "A category with this name/web address already exists."
        : "Could not update category: " + error.message,
    };
  refresh();
  redirect("/admin/categories?saved=1");
}

export async function deleteCategory(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { error: "Could not delete category: " + error.message };
  refresh();
  redirect("/admin/categories?deleted=1");
}
