// ===================================================================
// Customer data — PRIVATE. Runs on the server only, using the admin
// (secret) key, because customer info is not public.
// ===================================================================
import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

function mapCustomer(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    address: row.address,
    createdAt: row.created_at,
  };
}

export async function getAllCustomers() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    console.error("Error loading customers:", error.message);
    return [];
  }
  return data.map(mapCustomer);
}

export async function getCustomerById(id) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Error loading customer:", error.message);
    return null;
  }
  return mapCustomer(data);
}

// Purchase history = all invoices for this customer (newest first).
export async function getCustomerInvoices(customerId) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error loading customer invoices:", error.message);
    return [];
  }
  return data;
}
