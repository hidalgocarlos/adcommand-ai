import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

const SYSTEM_PROMPT = `
You are an elite Meta Ads performance analyst. Analyze campaign data and provide 
specific, data-backed recommendations.
`;

const AnalysisSchema = z.object({
  summary: z.string(),
  metrics: z.object({
    cpc: z.number(),
    roas: z.number(),
    spend: z.number(),
  }),
  recommendations: z.array(z.object({
    type: z.string(),
    priority: z.string(),
    title: z.string(),
    explanation: z.string(),
    impact: z.string(),
  })),
});

export class AiAnalyzer {
  constructor(private apiKey: string, private provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE') {}

  private getModel() {
    if (this.provider === 'OPENAI') {
      const openai = createOpenAI({ apiKey: this.apiKey });
      return openai('gpt-4o');
    }
    if (this.provider === 'ANTHROPIC') {
      const anthropic = createAnthropic({ apiKey: this.apiKey });
      return anthropic('claude-3-5-sonnet-20240620');
    }
    const google = createGoogleGenerativeAI({ apiKey: this.apiKey });
    return google('gemini-1.5-pro');
  }

  async analyzeCampaignPerformance(campaignData: any) {
    const model = this.getModel();
    const { object } = await generateObject({
      model,
      schema: AnalysisSchema,
      system: SYSTEM_PROMPT,
      prompt: `Analyze this campaign data: ${JSON.stringify(campaignData)}`,
    });
    
    return object;
  }
}
