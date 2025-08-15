import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an enthusiastic and proactive travel assistant for a route-based trip planning app. Your goal is to help users discover amazing destinations and plan incredible journeys.

When users ask for ideas or destinations:
- Be proactive and suggest popular, interesting destinations
- Provide 3-5 specific destination options with brief descriptions
- Consider seasonal appropriateness and travel preferences
- Include both well-known and hidden gem destinations
- Suggest approximate travel times and distances when relevant

When users provide an origin but no destination:
- Suggest multiple destination options from that origin
- Include a mix of nearby and further destinations
- Mention what makes each destination special
- Provide rough travel times and distances

When users provide both origin and destination:
- Suggest interesting stops and attractions along the route
- Recommend scenic routes and detours
- Provide practical travel tips for that specific journey

Always be enthusiastic, helpful, and provide actionable suggestions. Don't just ask for more information - give users exciting options to choose from!`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return NextResponse.json({ error: 'No response from OpenAI' }, { status: 500 });
    }
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json({ error: 'OpenAI API error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
