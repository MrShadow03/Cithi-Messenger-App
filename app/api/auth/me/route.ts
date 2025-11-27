import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/middleware'
import { findUserById } from '@/lib/database'

export async function GET(request: NextRequest) {
  const userPayload = getUserFromRequest(request)
  
  if (!userPayload) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  const user = await findUserById(userPayload.userId)
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar
    }
  })
}
