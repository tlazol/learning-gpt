import * as dotenv from 'dotenv'
import { OpenAI } from 'langchain/llms/openai'

dotenv.config()

const model = new OpenAI()

const input = '東京駅の緯度経度は？'

const res = await model.call(input)

console.log(input)
console.log(res)
