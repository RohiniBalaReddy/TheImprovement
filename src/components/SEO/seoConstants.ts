// seoConstants.ts

// Base constants
export const BASE_DEPLOYMENT_URL = "https://www.onecasa.in";
export const PROJECT_NAME = "OneCasa Real Estate";
export const PRIMARY_IMAGE_URL = `${BASE_DEPLOYMENT_URL}/images/logobb.png`;
export const PRIMARY_PHONE = "+918897574909";

// Corporate contact information (shared across all pages)
export const CORPORATE_CONTACTS = [
  {
    telephone: PRIMARY_PHONE,
    contactType: "customer service" as const,
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  {
    telephone: PRIMARY_PHONE,
    contactType: "sales" as const,
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  {
    telephone: PRIMARY_PHONE,
    contactType: "technical support" as const,
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
];

// Social profiles (shared across all pages)
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/onecasa",
  "https://twitter.com/onecasa_in",
  "https://www.instagram.com/onecasa.in/",
  "https://www.linkedin.com/company/onecasa1/",
];

export const DEFAULT_ADDRESS = {
  streetAddress: "New Green City, Madhapur, Hyderabad",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500030",
  addressCountry: "IN",
};

// Default opening hours
export const DEFAULT_OPENING_HOURS = "Mo-Su 09:00-18:00";

export const DEFAULT_KEYWORDS =
  "OneCasa, onecasa,construction,villa,flats,plots,one casa,One Casa,one-casa,One-Casa, real estate India, property listings, buy property, rent property, construction services India, interior design India, solar installation India, home interiors, furniture design";
