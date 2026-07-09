import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import ScrollProgress from "@/components/anim/ScrollProgress";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { CartProvider } from "@/components/cart/CartProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { getLang } from "@/lib/getLang";

// Wraps all public (customer-facing) pages with the shop header and footer.
export default async function PublicLayout({ children }) {
  const lang = await getLang();
  return (
   <LanguageProvider initialLang={lang}>
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollProgress />
        <Header />
        <main className="flex-1 pt-16 md:pt-24">{children}</main>
        <Footer />
        {/* Bottom tab bar on mobile; floating WhatsApp on desktop */}
        <MobileNav />
        <WhatsAppWidget />
        {/* Spacer so the fixed mobile tab bar never hides page content */}
        <div className="h-14 md:hidden" aria-hidden="true" />
      </div>
    </CartProvider>
   </LanguageProvider>
  );
}
