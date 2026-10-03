// Datos de contacto y redes en un solo lugar. Cualquier cambio aquí se refleja en toda la web.
export const brand = {
  name: "Bluz Creative",
  legalName: "Bluz Creative LLC",
  email: "bluzcreative@gmail.com",
  whatsappNumber: "584241401383",
  whatsappDisplay: "+58 424 140 13 83",
  instagramHandle: "@bluzcreative",
  instagramUrl: "https://instagram.com/bluzcreative",
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${brand.whatsappNumber}` + (message ? `?text=${encodeURIComponent(message)}` : "");
