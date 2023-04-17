import * as dotenv from 'dotenv'
import { OpenAIApi, Configuration } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

let prompt = '大阪と東京はどれくらい離れていますか？'
let completion = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt,
  temperature: 0.6,
  max_tokens: 1024
})

console.log(completion.data.choices)

prompt += `${completion.data.choices[0].text}\n`
prompt += '回答を英語で言い直してください'

completion = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt,
  temperature: 0.6,
  max_tokens: 1024
})

console.log(completion.data.choices)
