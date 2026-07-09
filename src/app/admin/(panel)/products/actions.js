"use server";

// ===================================================================
// Server actions for managing products. These run ONLY on the server.
// Each one first checks that a valid admin is logged in, then uses the
// secret admin client to add / edit / delete a product in Supabase.
// ===================================================================
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { createSupabaseServer } from "@/lib/supabase/serverClient";

// Make sure the request comes from a logged-in admin.
async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

// Turn "Cordless Drill 20V" into "cordless-drill-20v"
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const IMAGE_BUCKET = "product-images";

// If the admin picked a photo file, upload it to Supabase Storage and
// return its public URL. Otherwise return null. Creates the storage
// bucket automatically the first time.
async function uploadImageIfPresent(formData, supabase) {
  const file = formData.get("imageFile");
  if (!file || typeof file === "string" || file.size === 0) return null;

  // Make sure the public bucket exists (ignore "already exists").
  await supabase.storage.createBucket(IMAGE_BUCKET, { public: true }).catch(() => {});

  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (error) {
    console.error("Image upload failed:", error.message);
    return null;
  }

  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

// Read the form fields into a clean object for the database.
function readForm(formData) {
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const price = Number(formData.get("price") || 0);
  const offerRaw = String(formData.get("offer_price") || "").trim();
  const offerNum = offerRaw === "" ? null : Number(offerRaw);
  return {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    category: String(formData.get("category") || "").trim(),
    brand: String(formData.get("brand") || "").trim() || null,
    price,
    // Only keep a sale price if it's a valid number below the normal price
    offer_price: offerNum != null && offerNum > 0 && offerNum < price ? offerNum : null,
    offer_ends: String(formData.get("offer_ends") || "").trim() || null,
    stock_qty: parseInt(formData.get("stock_qty") || "0", 10),
    low_stock_threshold: parseInt(formData.get("low_stock_threshold") || "3", 10),
    featured: formData.get("featured") === "on",
    warranty: String(formData.get("warranty") || "").trim() || null,
    short_description: String(formData.get("short_description") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    image: String(formData.get("image") || "").trim() || null,
  };
}

// Refresh the pages that show product data.
function refreshPages() {
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function createProduct(prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);

  if (!values.name || !values.category) {
    return { error: "Name and category are required." };
  }

  const supabase = createAdminClient();

  // If a photo was uploaded, use it (overrides the optional URL field).
  const uploadedUrl = await uploadImageIfPresent(formData, supabase);
  if (uploadedUrl) values.image = uploadedUrl;

  const { error } = await supabase.from("products").insert(values);

  if (error) {
    // A duplicate slug is the most common problem.
    return {
      error: error.message.includes("duplicate")
        ? "A product with this web address (slug) already exists. Use a different name or slug."
        : "Could not save product: " + error.message,
    };
  }

  refreshPages();
  redirect("/admin/products?saved=1");
}

export async function updateProduct(id, prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);

  if (!values.name || !values.category) {
    return { error: "Name and category are required." };
  }

  const supabase = createAdminClient();

  // If a new photo was uploaded, use it; otherwise keep the existing image.
  const uploadedUrl = await uploadImageIfPresent(formData, supabase);
  if (uploadedUrl) values.image = uploadedUrl;

  const { error } = await supabase.from("products").update(values).eq("id", id);

  if (error) {
    return {
      error: error.message.includes("duplicate")
        ? "A product with this web address (slug) already exists. Use a different name or slug."
        : "Could not update product: " + error.message,
    };
  }

  refreshPages();
  redirect("/admin/products?saved=1");
}

export async function deleteProduct(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    return { error: "Could not delete product: " + error.message };
  }
  refreshPages();
  redirect("/admin/products?deleted=1");
}
