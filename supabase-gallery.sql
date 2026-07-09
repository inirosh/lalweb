-- =====================================================================
-- LAL DISTRIBUTORS — Product image gallery
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Adds a "gallery" column so a product can have several photos (shown as
-- a thumbnail gallery on the product page). The main photo stays in "image".
-- =====================================================================

alter table products
  add column if not exists gallery text[] not null default '{}';
