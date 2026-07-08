import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Wraps all public (customer-facing) pages with the shop header and footer.
export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
