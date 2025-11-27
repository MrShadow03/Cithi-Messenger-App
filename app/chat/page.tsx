'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import ChatBox from '@/components/ChatBox'
import EmptyChat from '@/components/EmptyChat'

interface User {
  id: string
  name: string
  phone: string
  avatar: string
  lastSeen?: string
}

export default function ChatPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          router.push('/auth')
          return
        }
        const data = await res.json()
        console.log('Current user loaded:', data.user)
        setCurrentUser(data.user)
        setLoading(false)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/auth')
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-cithi-chat flex items-center justify-center text-white">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  console.log('Chat page render:', { 
    hasCurrentUser: !!currentUser, 
    hasSelectedUser: !!selectedUser,
    selectedUserId: selectedUser?.id,
    selectedUserName: selectedUser?.name,
    willShowChatBox: !!(selectedUser && currentUser)
  })

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        selectedUser={selectedUser}
        onSelectUser={(user) => {
          console.log('Setting selected user:', user)
          setSelectedUser(user)
        }}
      />
      {selectedUser && currentUser ? (
        <>
          {console.log('Rendering ChatBox')}
          <ChatBox
            currentUser={currentUser}
            selectedUser={selectedUser}
          />
        </>
      ) : (
        <>
          {console.log('Rendering EmptyChat')}
          <EmptyChat />
        </>
      )}
    </div>
  )
}
