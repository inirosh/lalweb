"use server";

// Server actions for hero banners (stored in the `promotions` table).
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { createSupabaseServer } from "@/lib/supabase/serverClient";

const BUCKET = "banners";

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

async function uploadImageIfPresent(formData, supabase) {
  const file = formData.get("imageFile");
  if (!file || typeof file === "string" || file.size === 0) return null;
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});
  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type || "image/jpeg" });
  if (error) {
    console.error("Banner upload failed:", error.message);
    return null;
  }
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function readForm(formData) {
  return {
    title: String(formData.get("title") || "").trim() || null,
    subtitle: String(formData.get("subtitle") || "").trim() || null,
    cta_label: String(formData.get("cta_label") || "").trim() || null,
    cta_href: String(formData.get("cta_href") || "").trim() || null,
    active: formData.get("active") === "on",
    sort_order: parseInt(formData.get("sort_order") || "0", 10) || 0,
  };
}

function refresh() {
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function createBanner(prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  const supabase = createAdminClient();

  const uploaded = await uploadImageIfPresent(formData, supabase);
  values.image = uploaded || String(formData.get("image") || "").trim() || null;

  if (!values.image) return { error: "Please choose a banner image." };

  const { error } = await supabase.from("promotions").insert(values);
  if (error) return { error: "Could not save banner: " + error.message };
  refresh();
  redirect("/admin/banners?saved=1");
}

export async function updateBanner(id, prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  const supabase = createAdminClient();

  const uploaded = await uploadImageIfPresent(formData, supabase);
  values.image = uploaded || String(formData.get("image") || "").trim() || null;

  const { error } = await supabase.from("promotions").update(values).eq("id", id);
  if (error) return { error: "Could not update banner: " + error.message };
  refresh();
  redirect("/admin/banners?saved=1");
}

export async function deleteBanner(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("promotions").delete().eq("id", id);
  if (error) return { error: "Could not delete banner: " + error.message };
  refresh();
  redirect("/admin/banners?deleted=1");
}
