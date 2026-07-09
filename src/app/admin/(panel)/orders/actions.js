"use server";

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

const ALLOWED = ["new", "confirmed", "delivered", "cancelled"];

export async function updateOrderStatus(id, formData) {
  await requireAdmin();
  const status = String(formData.get("status") || "");
  if (!ALLOWED.includes(status)) return;
  const supabase = createAdminClient();
  await supabase.from("orders").update({ status }).eq("id", id);
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function deleteOrder(id) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) return { error: "Could not delete order: " + error.message };
  revalidatePath("/admin/orders");
  redirect("/admin/orders?deleted=1");
}
