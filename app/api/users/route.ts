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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const response = await apiClient.get('/users', {
      params: { page, limit },
    })
    
    return NextResponse.json(response)
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const response = await apiClient.post('/users', body)
    
    return NextResponse.json(response)
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    )
  }
}
