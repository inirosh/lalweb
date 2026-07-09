import { Poppins, Instrument_Serif, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";

// Bold, high-contrast poster feel — Poppins carries the brand headings well.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Ensures the Sinhala rupee symbol (රු) and any Sinhala text render cleanly.
const sinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
});

// Elegant italic serif for premium accent words in headings.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata = {
  metadataBase: new URL("https://lalweb.vercel.app"),
  title: {
    default: "Lal Distributors & Tools Shop | Power Tools & Home Appliances — Wadduwa",
    template: "%s | Lal Distributors",
  },
  description:
    "Lal Distributors — power tools, pressure washers, air compressors and home appliances in Wadduwa, Sri Lanka. Official EMTOP distributor. Island-wide free delivery, cash on delivery. Call 071 247 3281.",
  keywords: [
    "power tools Sri Lanka", "EMTOP Sri Lanka", "hardware shop Wadduwa",
    "pressure washer", "air compressor", "cordless drill", "home appliances Sri Lanka",
    "Lal Distributors",
  ],
  applicationName: "Lal Distributors",
  authors: [{ name: "Lal Distributors" }],
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Lal Distributors & Tools Shop",
    title: "Lal Distributors — Power Tools & Home Appliances, Wadduwa",
    description:
      "Official EMTOP distributor in Wadduwa. Power tools, appliances, free island-wide delivery, cash on delivery.",
    locale: "en_LK",
    images: [{ url: "/logo.jpg", width: 820, height: 820, alt: "Lal Distributors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lal Distributors — Power Tools & Home Appliances",
    description: "Official EMTOP distributor in Wadduwa, Sri Lanka.",
    images: ["/logo.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${instrumentSerif.variable} ${sinhala.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
