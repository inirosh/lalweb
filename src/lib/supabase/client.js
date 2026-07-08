// ===================================================================
// Browser Supabase client — uses the PUBLIC (publishable) key.
// Safe to use in components the customer's browser runs.
// Used for reading public data like the product catalog.
// ===================================================================
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(url, key);
