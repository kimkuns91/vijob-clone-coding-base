import { NextRequest, NextResponse } from 'next/server';

import { OPENAI_API_KEY } from '@/config';
import OpenAI from 'openai';
import { getJobById } from '@/utils/dummyData';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function translateText(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Translate the following text to English. Keep the translation natural and contextual.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content || text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const { id } = await context.params;
  const lang = request.nextUrl.searchParams.get('lang');

  console.log('id:', id);
  console.log('lang:', lang);

  try {
    if (!id || !lang) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const job = await getJobById(parseInt(id, 10));
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // 영어 요청일 경우 번역
    if (lang === 'en') {
      const translatedJob = {
        ...job,
        business: {
          ...job.business,
          address: {
            ...job.business.address,
            roadAddress: await translateText(job.business.address.roadAddress),
            jibunAddress: await translateText(
              job.business.address.jibunAddress
            ),
            addressDetail: await translateText(
              job.business.address.addressDetail
            ),
          },
        },
        address: {
          ...job.address,
          roadAddress: await translateText(job.business.address.roadAddress),
          jibunAddress: await translateText(job.business.address.jibunAddress),
          addressDetail: await translateText(
            job.business.address.addressDetail
          ),
        },
      };
      console.log('translatedJob:', translatedJob);
      return NextResponse.json(translatedJob);
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job details' },
      { status: 500 }
    );
  }
}
