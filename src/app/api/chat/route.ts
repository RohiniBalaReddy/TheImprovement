// /app/api/chat/route.ts
import apiClient from "@/utils/apiClient";
import { insertContext, productToParagraph } from "@/utils/chat/chatbot-helper";
import { getContext } from "@/utils/chat/context";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { buildPropertyLink } from "./helper";

export const maxDuration = 30;
export const runtime = "edge";

interface PropertyQueryFilters {
  city?: string;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  lookingType?: string;
  purpose?: string;
}

const GENERAL_KNOWLEDGE = `
### General Guidance (Use when relevant)
- **Property measurements (India):** 1 sq yd = 9 sq ft; 1 sq m ≈ 10.764 sq ft. Built-up > Carpet. Super area includes common areas.
- **Vastu (high-level only):** Entry NE/North preferred; Master BR SW; Kitchen SE/NW; avoid toilets over kitchen. Always add: "Consult a certified Vastu expert for site-specific advice."
- **Interiors quick tips:** Modular kitchen triangle (hob–sink–fridge) 4–7m. Wardrobe depth 22–24". TV viewing distance ≈ screen diagonal × 1.5–2. Sofa seat height 16–18".
- **Painting:** Economy (2–3 yrs), Premium (4–6 yrs), Luxury (washable, low VOC). Estimate = area × base rate × finish multiplier.
- **Construction:** Always do soil test, structural design, BOQ, and permits. Track progress (labor count, material GRNs, photos) daily.
(Only use these when user asks general questions. For company specifics, prefer the OneCasa context.)
`;

const getFurnitureContext = async () => {
  const response = await apiClient.get(`${apiClient.URLS.furniture}`);
  if (!response?.body || response.body.length === 0) {
    return {
      body: [],
      message: "Note: No furniture items are available at the moment.",
    };
  }
  return response;
};

const getPropertyContext = async (filters?: PropertyQueryFilters) => {
  const params: any = {};
  if (filters?.city) params.city = [filters.city];
  if (filters?.locality) params.locality = [filters.locality];
  if (filters?.minPrice && filters?.maxPrice)
    params.priceRange = [`${filters.minPrice}-${filters.maxPrice}`];

  const response = await apiClient.get(apiClient.URLS.unified_listing, {
    params,
  });

  return {
    ...response,
    link: buildPropertyLink(
      filters?.lookingType || "buy",
      filters?.city || "Hyderabad",
      filters?.purpose || "Buy"
    ),
    message:
      !response?.body || response.body.length === 0
        ? `Note: No properties found${
            filters?.city ? ` in ${filters.city}` : ""
          }.`
        : undefined,
  };
};

const furnitureKeywords = [
  "furniture",
  "sofa",
  "chair",
  "table",
  "bed",
  "cabinet",
  "desk",
  "couch",
  "Study & Office",
  "Custom Furniture",
];
const propertyKeywords = [
  "property",
  "buy",
  "rent",
  "flat",
  "villa",
  "plot",
  "commercial",
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = (
      messages?.[messages.length - 1]?.content || ""
    ).toLowerCase();

    const context: any = {};

    if (furnitureKeywords.some((k) => lastMessage.includes(k))) {
      const data = await getFurnitureContext();
      context.furniture_data = data?.body
        ?.map((item: any) => productToParagraph(item))
        .join(", ");
    }

    if (propertyKeywords.some((k) => lastMessage.includes(k))) {
      const data = await getPropertyContext({
        city: "Hyderabad",
        lookingType: lastMessage.includes("buy") ? "buy" : "rent",
        purpose: lastMessage.includes("buy") ? "Buy" : "Rent",
      });

      if (data.body?.length > 0) {
        context.property_data = `
${data.body
  .map(
    (p: any) =>
      `Property: ${p.propertyName}, Location: ${p.location?.city}, Price Range: ${p.pricing?.minPrice} - ${p.pricing?.maxPrice}`
  )
  .join(", ")}
You can explore more here: ${data.link}
`;
      } else {
        context.property_data = data.message;
      }
    }

    // IMPORTANT: Use a Responses API model ID
    const result = await streamText({
      model: google("gemini-2.5-flash"), // ✅ works with current ai-sdk + v1beta streaming
      system: insertContext(context) + "\n" + GENERAL_KNOWLEDGE,
      messages,
    });
    return result.toDataStreamResponse();
  } catch (err) {
    console.error("ERROR /api/chat:", err);
    return NextResponse.json(
      { success: false, message: (err as Error).message || "Chat failed" },
      { status: 500 }
    );
  }
}
