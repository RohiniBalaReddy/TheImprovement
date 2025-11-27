import { ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { getMatchesFromEmbeddings } from "../pinecone";
import { getEmbeddings } from "./getEmbedding";

export type Metadata = {
  url: string;
  text: string;
  chunk: string;
};

export const getContext = async (
  message: string,
  minScore = 0.7,
  getOnlyText = true,
  maxTokens = 5000
): Promise<string | ScoredPineconeRecord[]> => {
  const embeddings = await getEmbeddings(message);

  const matches = await getMatchesFromEmbeddings(embeddings, 3, "");

  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

  if (!getOnlyText) {
    return qualifyingDocs;
  }

  let docs = matches
    ? qualifyingDocs.map((match) => (match.metadata as Metadata).chunk)
    : [];
  return docs.join("\n").substring(0, maxTokens);
};
