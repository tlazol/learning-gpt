import * as dotenv from 'dotenv'
import { OpenAIApi, Configuration } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const completion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: '東京駅の緯度経度は？'
    }
  ]
})

console.log(completion.data.choices)
