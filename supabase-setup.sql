-- =====================================================================
-- LAL DISTRIBUTORS — Database setup
-- Paste this whole file into the Supabase SQL Editor and click "Run".
-- It creates 4 tables (products, customers, invoices, invoice_items),
-- sets up security, and adds your 8 starter products.
-- Safe to run more than once.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) PRODUCTS  — what you sell (shown on the public website)
-- ---------------------------------------------------------------------
create table if not exists products (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,        -- web address part, e.g. "cordless-drill"
  name              text not null,
  category          text not null,               -- one of the category slugs
  brand             text,
  price             numeric(12,2) not null default 0,   -- price in Rupees
  stock_qty         integer not null default 0,         -- how many in stock
  -- in_stock is calculated automatically from stock_qty (no need to edit it)
  in_stock          boolean generated always as (stock_qty > 0) stored,
  low_stock_threshold integer not null default 3,       -- warn at/below this qty
  featured          boolean not null default false,     -- show on homepage
  warranty          text,
  short_description text,
  description       text,
  image             text,                        -- photo URL (optional)
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2) CUSTOMERS — people you sell to (used for invoices)
-- ---------------------------------------------------------------------
create table if not exists customers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text,
  address    text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3) INVOICES — one bill per sale
-- ---------------------------------------------------------------------
create sequence if not exists invoice_seq start 1;

create table if not exists invoices (
  id             uuid primary key default gen_random_uuid(),
  -- human-friendly number like INV-000001
  invoice_number text unique not null
                 default ('INV-' || lpad(nextval('invoice_seq')::text, 6, '0')),
  customer_id    uuid references customers(id) on delete set null,
  subtotal       numeric(12,2) not null default 0,
  discount       numeric(12,2) not null default 0,
  total          numeric(12,2) not null default 0,
  created_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 4) INVOICE_ITEMS — the line items on each bill
-- ---------------------------------------------------------------------
create table if not exists invoice_items (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references invoices(id) on delete cascade,
  product_id  uuid references products(id) on delete set null,
  description text not null,             -- product name snapshot at sale time
  unit_price  numeric(12,2) not null default 0,
  quantity    integer not null default 1,
  line_total  numeric(12,2) not null default 0
);

-- =====================================================================
-- SECURITY (Row Level Security)
-- - Products: anyone can READ (public catalog), only admin can change.
-- - Customers / invoices: PRIVATE. No public access at all.
--   (The admin panel uses the secret key which bypasses these rules.)
-- =====================================================================
alter table products      enable row level security;
alter table customers     enable row level security;
alter table invoices      enable row level security;
alter table invoice_items enable row level security;

-- Allow the public website to read products
drop policy if exists "public can read products" on products;
create policy "public can read products"
  on products for select
  using (true);

-- (No public policies on customers/invoices/invoice_items = fully private.)

-- =====================================================================
-- STARTER PRODUCTS — your 8 sample items
-- =====================================================================
insert into products
  (slug, name, category, brand, price, stock_qty, featured, warranty, short_description, description)
values
  ('intimax-high-pressure-washer','Intimax High Pressure Washer','pressure-washers','Intimax',18500,12,true,'1 Year Warranty',
   'Powerful high-pressure washer for cars, walls, tiles and driveways.',
   'The Intimax High Pressure Washer delivers strong, consistent water pressure for cleaning vehicles, walls, floors and outdoor surfaces. Compact, durable and easy to use for home and light commercial cleaning.'),
  ('emtop-auto-air-compressor','EMTOP Auto Air Compressor','air-compressors','EMTOP',9800,8,true,'6 Months Warranty',
   'Portable 12V auto air compressor for tyres, balls and inflatables.',
   'The EMTOP Auto Air Compressor is a portable 12V inflator perfect for car and motorbike tyres, sports balls and inflatables. Comes with a built-in pressure gauge for accurate inflation.'),
  ('lakro-electric-scraper','Lakro Electric Scraper','cleaning-equipment','Lakro',14200,5,true,'1 Year Warranty',
   'Electric scraper for removing tiles, paint, glue and old flooring.',
   'The Lakro Electric Scraper makes light work of removing old tiles, paint, adhesive and flooring. Powerful motor with an ergonomic grip for controlled, fatigue-free operation.'),
  ('cordless-impact-drill-20v','Cordless Impact Drill 20V','power-tools','EMTOP',12500,15,true,'1 Year Warranty',
   '20V cordless impact drill with 2 batteries and charger.',
   'A versatile 20V cordless impact drill for drilling and driving screws into wood, metal and masonry. Includes two rechargeable batteries, a fast charger and a carry case.'),
  ('angle-grinder-4-inch','Angle Grinder 4 inch','power-tools','EMTOP',7600,0,false,'6 Months Warranty',
   'Corded 4-inch angle grinder for cutting and grinding metal & stone.',
   'A reliable corded 4-inch angle grinder for cutting, grinding and polishing metal, tile and stone. Powerful motor with a comfortable side handle for safe operation.'),
  ('circular-saw-1400w','Circular Saw 1400W','power-tools','Intimax',16900,6,false,'1 Year Warranty',
   '1400W corded circular saw for straight, clean wood cuts.',
   'A 1400W corded circular saw for fast, straight cuts through timber, plywood and boards. Adjustable cutting depth and angle with a durable carbide-tipped blade included.'),
  ('electric-kettle-1-8l','Electric Kettle 1.8L','home-appliances','National',3200,20,false,'1 Year Warranty',
   '1.8L stainless steel electric kettle with auto shut-off.',
   'A 1.8L stainless steel electric kettle that boils water fast, with automatic shut-off and boil-dry protection for safety. Ideal for everyday home use.'),
  ('drill-bit-set-13pc','Drill Bit Set (13 pcs)','accessories','EMTOP',1850,40,false,'No Warranty',
   '13-piece HSS drill bit set for wood and metal.',
   'A 13-piece high-speed steel (HSS) drill bit set covering the most common sizes for drilling wood and metal. Comes in a compact storage case.')
on conflict (slug) do nothing;
