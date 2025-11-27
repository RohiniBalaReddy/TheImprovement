import { NextResponse } from "next/server";
import seed from "./seed";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const documents = await seed(process.env.PINECONE_INDEX!, 100);
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed crawling" });
  }
}
