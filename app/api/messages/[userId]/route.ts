import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, unauthorizedResponse } from '@/lib/middleware'
import { getMessagesBetweenUsers, markMessagesAsRead } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userPayload = getUserFromRequest(request)
  
  if (!userPayload) {
    return unauthorizedResponse()
  }

  try {
    const messages = await getMessagesBetweenUsers(userPayload.userId, params.userId)
    
    // Mark messages as read
    await markMessagesAsRead(userPayload.userId, params.userId)

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
