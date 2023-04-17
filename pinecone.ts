import * as dotenv from "dotenv"
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PineconeClient } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer'

dotenv.config()

const loader = new PuppeteerWebBaseLoader('https://www.mr-motegi.jp/access_m/', {
  launchOptions: {
    headless: true
  },
  gotoOptions: {
    waitUntil: 'domcontentloaded'
  },
  async evaluate(page) {
    const result = await page.evaluate(() => document.querySelector('.lig-content')?.innerText)
    return result
  }
})

const docs = await loader.load()

const textSplitter = new RecursiveCharacterTextSplitter({
  separators: ['\n'],
  chunkSize: 800,
  chunkOverlap: 200
})

const documents = await textSplitter.splitDocuments(docs)
console.log(documents)

const client = new PineconeClient()
await client.init({
  apiKey: process.env.PINECONE_API_KEY as string,
  environment: process.env.PINECONE_ENVIRONMENT as string
})

const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string)

console.log('PineconeStore start')
await PineconeStore.fromDocuments(
  documents,
  new OpenAIEmbeddings(),
  {
    pineconeIndex
  }
)
console.log('PineconeStore end')