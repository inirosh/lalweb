-- =====================================================================
-- LAL DISTRIBUTORS — Product cost price (PRIVATE)
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Stores your buying cost per product in a SEPARATE, private table so it
-- is NEVER visible to customers (only you, through the admin panel).
-- =====================================================================

create table if not exists product_costs (
  product_id uuid primary key references products(id) on delete cascade,
  cost_price numeric(12,2) not null default 0,
  updated_at timestamptz not null default now()
);

-- PRIVATE: row-level security on, and no public policy at all.
-- Only the admin (secret key) can read or write cost prices.
alter table product_costs enable row level security;
