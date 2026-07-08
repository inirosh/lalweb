// ===================================================================
// Server-only Supabase admin client — uses the SECRET key.
// NEVER import this into a browser ("use client") component.
// It bypasses row-level security and is used by the admin panel
// (Phase 2) for stock, customers and invoices.
// ===================================================================
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

export function createAdminClient() {
  return createClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
