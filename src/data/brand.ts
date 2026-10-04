// Datos de contacto y redes en un solo lugar. Cualquier cambio aquí se refleja en toda la web.
export const brand = {
  name: "Bluz Creative",
  legalName: "Bluz Creative LLC",
  email: "bluzcreative@gmail.com",
  whatsappNumber: "19452035107",
  whatsappDisplay: "+1 (945) 203-5107",
  instagramHandle: "@bluzcreative",
  instagramUrl: "https://instagram.com/bluzcreative",
  linkedinUrl: "https://www.linkedin.com/company/bluz-creative/",
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${brand.whatsappNumber}` + (message ? `?text=${encodeURIComponent(message)}` : "");
