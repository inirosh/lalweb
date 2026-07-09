// Server helper: reads the chosen language from the cookie.
import "server-only";
import { cookies } from "next/headers";
import { LANGS, DEFAULT_LANG } from "@/lib/i18n";

export async function getLang() {
  const store = await cookies();
  const lang = store.get("lang")?.value;
  return LANGS.includes(lang) ? lang : DEFAULT_LANG;
}
