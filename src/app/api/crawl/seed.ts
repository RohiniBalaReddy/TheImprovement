import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { Crawler, Page } from "./crawler";
import md5 from "md5";
import {
  Document,
  MarkdownTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "@/utils/chat/getEmbedding";
import { chunkedUpsert } from "@/utils/chat/chunkedUpsert";

type DocumentSplitter = MarkdownTextSplitter;

async function seed(indexName: string, limit: number) {
  try {
    const pinecone = new Pinecone();

    console.log("initialise pinecone and check indexes");

    const index = pinecone.index(indexName);

    const crawler = new Crawler(1, limit || 100);

    const pages = (await crawler.crawl(process.env.BASE_URL!)) as Page[];

    const splitter: DocumentSplitter = new MarkdownTextSplitter({});

    console.log("Preparing documents");

    const documents = await Promise.all(
      pages.map((page) => prepareDocument(page, splitter))
    );
    console.log("Complete Preparing documents");
    const vectors = await Promise.all(documents.flat().map(embedDocument));
    console.log("Complete embedding documents");

    await chunkedUpsert(index!, vectors, "", 10);

    console.log("Complete upserting documents");

    return documents[0];
  } catch (error) {
    console.error("Error seeding:", error);
    throw error;
  }
}

async function embedDocument(doc: Document): Promise<PineconeRecord> {
  try {
    const embedding = await getEmbeddings(doc.pageContent);

    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embedding,
      metadata: {
        chunk: doc.pageContent,
        text: doc.metadata.text as string,
        url: doc.metadata.url as string,
        hash: doc.metadata.hash as string,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding document: ", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: Page, splitter: DocumentSplitter) {
  const pageContent = page.content;

  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        url: page.url,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs.map((doc) => {
    return {
      pageContent: doc.pageContent,
      metadata: {
        ...doc.metadata,
        hash: md5(doc.pageContent),
      },
    };
  });
}

export default seed;
