export const buildPropertyLink = (
  lookingType: string,
  city: string,
  purpose: string
): string => {
  const typePath = lookingType.toLowerCase() === "buy" ? "Sell" : lookingType;
  const cityPath = city || "Hyderabad";
  const purposeParam = purpose ? `?commercialPurpose=${purpose}` : "";

  return `https://www.onecasa.in/properties/${typePath}/${cityPath}${purposeParam}`;
};
