import { Poppins } from "next/font/google";
import "./globals.css";

// Bold, high-contrast poster feel — Poppins carries the brand headings well.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Lal Distributors & Tools Shop | Power Tools & Home Appliances — Waduwa",
  description:
    "Lal Distributors — Power tools, pressure washers, air compressors and home appliances in Waduwa, Sri Lanka. Value for money. Call 071 247 3281.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
