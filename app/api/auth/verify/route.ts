import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing token' }),
      { status: 400 }
    )
  }
  
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    })
    
    if (!verificationToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 400 }
      )
    }
    
    if (verificationToken.expires < new Date()) {
      return new NextResponse(
        JSON.stringify({ error: 'Token expired' }),
        { status: 400 }
      )
    }
    
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }
    })
    
    await prisma.verificationToken.delete({
      where: { token }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}
