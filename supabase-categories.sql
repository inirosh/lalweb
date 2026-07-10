-- =====================================================================
-- LAL DISTRIBUTORS — Manageable categories
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Moves product categories into a table so you can add / rename / reorder
-- them from the admin panel (instead of them being fixed in code).
-- =====================================================================

create table if not exists categories (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,   -- web-address part, e.g. "power-tools"
  name       text not null,          -- display name, e.g. "Power Tools"
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Categories are public to read (shown on the site), admin manages them.
alter table categories enable row level security;
drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

-- Seed with your current categories (only if not already there).
insert into categories (slug, name, sort_order) values
  ('power-tools', 'Power Tools', 1),
  ('pressure-washers', 'Pressure Washers', 2),
  ('air-compressors', 'Air Compressors', 3),
  ('cleaning-equipment', 'Electric Scrapers / Cleaning', 4),
  ('home-appliances', 'Home Appliances', 5),
  ('accessories', 'Accessories & Spare Parts', 6)
on conflict (slug) do nothing;
