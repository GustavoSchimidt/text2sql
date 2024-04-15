import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { createSqlPromptTemplate } from './prompts/template';
import { tables } from './prompts/database';

@Injectable()
export class AppService {  
  async generateSql(message: string): Promise<any> {

    const prompt = await this.createPrompt(message);
    const llm = await this.callLLM(prompt);

    return llm;
  }

  async callLLM(prompt: string) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });
  
    let response = '';
  
    for await (const chunk of stream) {
      const deltaContent = chunk.choices[0]?.delta?.content || "";
      response += deltaContent;
      process.stdout.write(deltaContent);
    }
  
    return response;
  }

  async createPrompt(question: string) {
    const prompt = createSqlPromptTemplate(
      tables,
      question
  );
    return prompt;
  }
}

