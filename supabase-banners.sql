-- =====================================================================
-- LAL DISTRIBUTORS — Hero banner images
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Adds an image column to the promotions/banners table so you can upload
-- your own hero banner pictures from the admin panel.
-- =====================================================================

alter table promotions
  add column if not exists image text;

-- (The promotions table + its public-read policy were created earlier by
--  supabase-deals.sql, so nothing else is needed here.)
