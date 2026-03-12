import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

const SYSTEM_PROMPT = `
You are an elite Meta Ads performance analyst with 15+ years of experience 
managing multi-million dollar ad budgets. You analyze campaign data and provide 
specific, data-backed recommendations. Always structure your response as:

1. **EXECUTIVE SUMMARY** (2-3 sentences, overall assessment)
2. **WHAT'S WORKING** (list campaigns/adsets performing well, explain WHY with metrics)
3. **WHAT'S NOT WORKING** (list underperformers, root cause analysis)
4. **CRITICAL ACTIONS** (max 5, prioritized, each with: action, reason, expected impact)
5. **BUDGET RECOMMENDATIONS** (specific reallocation suggestions with percentages)
6. **30-DAY FORECAST** (based on current trajectory)

Be specific. Use the actual numbers from the data. Never be vague.
`;

export async function analyzeCampaignPerformance(data: any, provider: 'openai' | 'anthropic' | 'google' = 'anthropic') {
  const model = 
    provider === 'openai' ? openai('gpt-4o') :
    provider === 'anthropic' ? anthropic('claude-3-5-sonnet-20240620') :
    google('gemini-1.5-pro');

  const prompt = `Analyze the following Meta Ads data: ${JSON.stringify(data)}`;

  return streamText({
    model,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });
}
