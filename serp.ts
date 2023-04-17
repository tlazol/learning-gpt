import * as dotenv from "dotenv"
import { OpenAI } from "langchain/llms/openai"
import { SerpAPI } from "langchain/tools"
import { initializeAgentExecutor } from "langchain/agents"

dotenv.config()

const model = new OpenAI()
const tools = [new SerpAPI()]

const executor = await initializeAgentExecutor(tools, model, 'zero-shot-react-description')

const input = 'モビリティリゾートもてぎの住所を日本語で教えてください。'
const result = await executor.call({ input })

console.log(input)
console.dir(result, { depth: null })
