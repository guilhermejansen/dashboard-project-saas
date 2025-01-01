import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/mail'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)
    
    const exists = await prisma.user.findUnique({
      where: { email }
    })
    
    if (exists) {
      return new NextResponse(
        JSON.stringify({ error: 'Email already exists' }),
        { status: 400 }
      )
    }
    
    const hashedPassword = await hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })
    
    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: crypto.randomUUID(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    })
    
    await sendVerificationEmail(email, verificationToken.token)
    
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      }
    })
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
