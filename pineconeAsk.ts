import * as dotenv from "dotenv"
import { OpenAI } from 'langchain/llms/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PineconeClient } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { VectorDBQAChain } from 'langchain/chains'

dotenv.config()

const client = new PineconeClient()
await client.init({
  apiKey: process.env.PINECONE_API_KEY as string,
  environment: process.env.PINECONE_ENVIRONMENT as string,
})

const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string)

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
)

const model = new OpenAI()
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
})

const input = 'モビリティリゾートもてぎの住所は?'
const response = await chain.call({
  query: input,
})

console.log(input)
console.log(response)