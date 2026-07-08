"use server";

// Server actions for managing customers. Each checks the admin is
// logged in, then uses the secret admin client to change the database.
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

function readForm(formData) {
  return {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim() || null,
    address: String(formData.get("address") || "").trim() || null,
  };
}

export async function createCustomer(prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  if (!values.name) return { error: "Customer name is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("customers").insert(values);
  if (error) return { error: "Could not save customer: " + error.message };

  revalidatePath("/admin/customers");
  redirect("/admin/customers?saved=1");
}

export async function updateCustomer(id, prevState, formData) {
  await requireAdmin();
  const values = readForm(formData);
  if (!values.name) return { error: "Customer name is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("customers").update(values).eq("id", id);
  if (error) return { error: "Could not update customer: " + error.message };

  revalidatePath("/admin/customers");
  revalidatePath(`/admin/customers/${id}`);
  redirect("/admin/customers?saved=1");
}

export async function deleteCustomer(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) return { error: "Could not delete customer: " + error.message };

  revalidatePath("/admin/customers");
  redirect("/admin/customers?deleted=1");
}
