-- =====================================================================
-- LAL DISTRIBUTORS — Online orders
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Saves every website checkout so you have a real Orders list in admin.
-- =====================================================================

create sequence if not exists order_seq start 1;

-- One row per order placed on the website.
create table if not exists orders (
  id               uuid primary key default gen_random_uuid(),
  order_number     text unique not null
                   default ('ORD-' || lpad(nextval('order_seq')::text, 6, '0')),
  customer_name    text not null,
  customer_phone   text not null,
  customer_address text not null,
  note             text,
  subtotal         numeric(12,2) not null default 0,
  discount         numeric(12,2) not null default 0,
  coupon_code      text,
  total            numeric(12,2) not null default 0,
  status           text not null default 'new',   -- new / confirmed / delivered / cancelled
  created_at       timestamptz not null default now()
);

-- The items in each order.
create table if not exists order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  product_slug text,
  name         text not null,
  unit_price   numeric(12,2) not null default 0,
  quantity     integer not null default 1,
  line_total   numeric(12,2) not null default 0
);

-- PRIVATE: no public access. Orders are saved and read by the admin only
-- (the website saves them through a secure server action using the secret key).
alter table orders      enable row level security;
alter table order_items enable row level security;
