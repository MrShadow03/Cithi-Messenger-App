import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, unauthorizedResponse } from '@/lib/middleware'
import { createMessage } from '@/lib/database'

export async function POST(request: NextRequest) {
  const userPayload = getUserFromRequest(request)
  
  if (!userPayload) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()
    const { receiverId, text } = body

    if (!receiverId || !text) {
      return NextResponse.json(
        { error: 'Receiver ID and text are required' },
        { status: 400 }
      )
    }

    const message = await createMessage({
      senderId: userPayload.userId,
      receiverId,
      text,
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
