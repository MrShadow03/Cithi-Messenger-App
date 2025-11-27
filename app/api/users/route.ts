import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, unauthorizedResponse } from '@/lib/middleware'
import { getAllUsers, getConversationsForUser, findUserById } from '@/lib/database'

export async function GET(request: NextRequest) {
  const userPayload = getUserFromRequest(request)
  
  if (!userPayload) {
    return unauthorizedResponse()
  }

  try {
    const conversations = await getConversationsForUser(userPayload.userId)
    const allUsers = await getAllUsers()
    
    // Get conversation details with user info
    const conversationsWithUserInfo = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = conv.participants.find(p => p !== userPayload.userId)
        const otherUser = await findUserById(otherUserId!)
        
        return {
          id: conv.id,
          user: otherUser ? {
            id: otherUser.id,
            name: otherUser.name,
            phone: otherUser.phone,
            avatar: otherUser.avatar,
            lastSeen: otherUser.lastSeen
          } : null,
          lastMessage: conv.lastMessage,
          lastMessageTime: conv.lastMessageTime
        }
      })
    )

    // Get users who haven't messaged yet
    const usersInConversations = new Set(
      conversations.flatMap(c => c.participants)
    )
    
    const otherUsers = allUsers
      .filter(u => u.id !== userPayload.userId && !usersInConversations.has(u.id))
      .map(u => ({
        id: u.id,
        name: u.name,
        phone: u.phone,
        avatar: u.avatar,
        lastSeen: u.lastSeen
      }))

    return NextResponse.json({
      conversations: conversationsWithUserInfo.filter(c => c.user !== null),
      otherUsers
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
