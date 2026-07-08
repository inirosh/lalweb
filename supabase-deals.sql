-- =====================================================================
-- LAL DISTRIBUTORS — Deals & Offers update
-- Run this in the Supabase SQL Editor (same as before), click "Run".
-- Adds: (1) an optional sale price on products, and
--       (2) a promotions/banners table for homepage announcements.
-- Safe to run more than once.
-- =====================================================================

-- 1) Optional SALE price on a product.
--    Leave it empty for normal price. Set it (lower than price) to put
--    the product "on offer" — the site shows the old price crossed out.
alter table products
  add column if not exists offer_price numeric(12,2);

-- 2) PROMOTIONS — homepage banners / announcements (e.g. "Avurudu Sale").
create table if not exists promotions (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,           -- big line, e.g. "Avurudu Mega Sale"
  subtitle   text,                    -- smaller line, e.g. "Up to 20% off tools"
  cta_label  text,                    -- optional button text, e.g. "Shop Now"
  cta_href   text,                    -- optional button link, e.g. "/products"
  active     boolean not null default true,   -- show on the site?
  sort_order integer not null default 0,       -- lower shows first
  created_at timestamptz not null default now()
);

-- Security: promotions are public to READ (they're announcements),
-- but only the admin (secret key) can create/change them.
alter table promotions enable row level security;

drop policy if exists "public can read active promotions" on promotions;
create policy "public can read active promotions"
  on promotions for select
  using (active = true);
