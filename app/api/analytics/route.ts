import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { apiClient } from '@/lib/api/client'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'daily'
    
    const [overview, detailedStats] = await Promise.all([
      apiClient.get('/analytics/overview'),
      apiClient.get(`/analytics/stats/${period}`),
    ])
    
    return NextResponse.json({
      overview,
      detailedStats,
    })
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    )
  }
}
