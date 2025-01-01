import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { apiClient } from '@/lib/api/client'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const response = await apiClient.get('/settings')
    return NextResponse.json(response)
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    )
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const response = await apiClient.put('/settings', body)
    
    return NextResponse.json(response)
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    )
  }
}
