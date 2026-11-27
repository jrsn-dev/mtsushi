const configured = (process.env.NEXT_PUBLIC_WHATSAPP || "").trim();
export const site = {
  name: "MTSUSHI ARTE",
  shortName: "MTSUSHI",
  url: "https://mtsushiarte.com.br",
  phoneDisplay: "(43) 99926-8358",
  phoneHref: "tel:+5543999268358",
  email: "oi@mtsushiarte.com.br",
  whatsapp: /^55\d{10,11}$/.test(configured) ? configured : "5543999268358",
  address: {
    street: "Somente delivery",
    district: "Jacarezinho",
    city: "Jacarezinho",
    state: "PR",
    country: "BR",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jacarezinho+PR",
  // Preencha com os perfis reais; links vazios não são renderizados.
  social: {
    instagram: "https://www.instagram.com/mtsushiarte/",
    facebook: "",
  },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
