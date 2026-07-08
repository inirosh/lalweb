import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/anim/ScrollProgress";
import WhatsAppWidget from "@/components/WhatsAppWidget";

// Wraps all public (customer-facing) pages with the shop header and footer.
export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
