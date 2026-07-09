-- =====================================================================
-- LAL DISTRIBUTORS — Product specifications
-- Paste into the Supabase SQL Editor and click "Run". Safe to run again.
-- Adds a "specifications" field so each product can list its technical
-- specs (power, voltage, RPM, etc.) shown as a neat table on the site.
-- =====================================================================

alter table products
  add column if not exists specifications text;
