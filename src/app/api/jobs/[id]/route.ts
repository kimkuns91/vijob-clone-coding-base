import { NextRequest, NextResponse } from 'next/server';

import { getJobById } from '@/utils/dummyData';
import { translateJobData } from '@/utils/translateJob';

// 임시 데이터 fetcher (실제로는 DB에서 가져와야 함)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ko';

    const jobData = await getJobById(Number(params.id));
    if (!jobData) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const translatedJob = await translateJobData(jobData, lang as 'ko' | 'en');
    return NextResponse.json(translatedJob);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch job data',
      },
      { status: 500 }
    );
  }
}
