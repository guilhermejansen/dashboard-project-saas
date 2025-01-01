import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { apiClient } from '@/lib/api/client'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const response = await apiClient.post(`/users/${params.id}/settings`, body)
    return NextResponse.json(response)
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    )
  }
}
