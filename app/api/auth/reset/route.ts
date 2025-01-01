import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const resetSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, password } = resetSchema.parse(body)
    
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    })
    
    if (!resetToken || resetToken.expires < new Date()) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 400 }
      )
    }
    
    const hashedPassword = await hash(password, 12)
    
    await prisma.user.update({
      where: { email: resetToken.identifier },
      data: { password: hashedPassword }
    })
    
    await prisma.passwordResetToken.delete({
      where: { token }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: error.issues }),
        { status: 400 }
      )
    }
    
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}
