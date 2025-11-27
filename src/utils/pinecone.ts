import {
  Pinecone,
  type ScoredPineconeRecord,
} from "@pinecone-database/pinecone";

export type Metadata = {
  url: string;
  text: string;
  chunk: string;
  hash: string;
};

export const getMatchesFromEmbeddings = async (
  embeddings: number[],
  topK: number,
  namespace: string
): Promise<ScoredPineconeRecord<Metadata>[]> => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const indexName: string = process.env.PINECONE_INDEX || "";

  if (indexName === "") {
    throw new Error("PINECONE_INDEX environment variable not set");
  }

  const indexes = (await pinecone.listIndexes())?.indexes;

  if (!indexes || indexes.filter((i) => i.name === indexName).length === 0) {
    throw new Error(`Index ${indexName} does not exist`);
  }

  const index = pinecone!.Index<Metadata>(indexName);

  const pineconeNamespace = index.namespace(namespace ?? "");

  try {
    // Query the index with the defined request
    const queryResult = await pineconeNamespace.query({
      vector: embeddings,
      topK,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (e) {
    // Log the error and throw it
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};
