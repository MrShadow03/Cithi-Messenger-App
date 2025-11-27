import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByPhone } from '@/lib/database'
import { hashPassword, generateToken, getRandomAvatar } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, password } = body

    if (!name || !phone || !password) {
      return NextResponse.json(
        { error: 'Name, phone, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await findUserByPhone(phone)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this phone number already exists' },
        { status: 409 }
      )
    }

    // Create user
    const hashedPassword = await hashPassword(password)
    const user = await createUser({
      name,
      phone,
      password: hashedPassword,
      avatar: getRandomAvatar()
    })

    // Generate token
    const token = generateToken({
      userId: user.id,
      phone: user.phone
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar
      }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
