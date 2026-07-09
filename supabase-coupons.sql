-- =====================================================================
-- LAL DISTRIBUTORS — Offers & Coupons update
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Adds: (1) an optional END TIME for limited-time product offers, and
--       (2) a coupons table for discount codes.
-- =====================================================================

-- 1) Optional end time for a product's sale (for "limited-time" offers).
--    Set it (e.g. this Sunday midnight) to show a countdown timer.
alter table products
  add column if not exists offer_ends timestamptz;

-- 2) COUPONS — discount codes customers can collect and use at checkout.
create table if not exists coupons (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,             -- e.g. "SAVE10" (customer types this)
  description    text,                             -- e.g. "10% off power tools"
  discount_type  text not null default 'percent',  -- 'percent' or 'fixed'
  discount_value numeric(12,2) not null default 0, -- 10 (=10%) or 500 (=Rs 500)
  min_order      numeric(12,2) not null default 0, -- minimum cart subtotal to use
  product_slug   text,                             -- limit to one product (optional)
  valid_from     timestamptz,                      -- when it starts (optional)
  valid_to       timestamptz,                      -- when it expires (optional)
  active         boolean not null default true,    -- show / allow it?
  created_at     timestamptz not null default now()
);

-- Security: anyone can READ active coupons (to collect + use them),
-- but only the admin (secret key) can create / change them.
alter table coupons enable row level security;

drop policy if exists "public can read active coupons" on coupons;
create policy "public can read active coupons"
  on coupons for select
  using (active = true);

-- A couple of starter coupons so you can see it working (edit/delete anytime).
insert into coupons (code, description, discount_type, discount_value, min_order, active)
values
  ('WELCOME5', 'Rs 500 off your first order over Rs 10,000', 'fixed', 500, 10000, true),
  ('TOOLS10', '10% off any order', 'percent', 10, 0, true)
on conflict (code) do nothing;
