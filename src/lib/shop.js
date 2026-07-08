// ===================================================================
// Central shop information. Edit values here to update them everywhere
// on the site (header, footer, contact page, buttons, etc.).
// ===================================================================
export const SHOP = {
  name: "Lal Distributors & Tools Shop",
  altName: "Lal Distributors Home Appliances",
  location: "Waduwa, Sri Lanka",
  phoneDisplay: "071 247 3281",
  // International format used for tel: and WhatsApp links (Sri Lanka +94)
  phoneIntl: "94712473281",
  email: "laldistributors7@gmail.com",
  instagram: "lal_distributors_official",
  instagramUrl: "https://instagram.com/lal_distributors_official",
  hours: "Always open (24/7 online)",
  tagline: "Power Tools • Home Appliances • Value for Money",
};

// Helper links used by the "Call" and "WhatsApp" buttons
export const telLink = `tel:+${SHOP.phoneIntl}`;
export const whatsappLink = (message = "") =>
  `https://wa.me/${SHOP.phoneIntl}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
