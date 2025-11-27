'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  phone: string
  avatar: string
  lastSeen?: string
}

interface Conversation {
  id: string
  user: User
  lastMessage?: string
  lastMessageTime?: string
}

interface SidebarProps {
  currentUser: User | null
  selectedUser: User | null
  onSelectUser: (user: User) => void
}

export default function Sidebar({ currentUser, selectedUser, onSelectUser }: SidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [otherUsers, setOtherUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    loadUsers()
    // Poll for updates every 5 seconds
    const interval = setInterval(loadUsers, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations)
        setOtherUsers(data.otherUsers)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/auth')
  }

  const allUsers = [
    ...conversations.map(c => c.user),
    ...otherUsers
  ]

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  )

  return (
    <div className="w-[280px] bg-cithi-sidebar p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentUser?.avatar && (
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img
                src={currentUser.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className="text-white font-black text-[28px] tracking-[10px]">
            CITHI
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-white hover:text-cithi-light transition-colors"
          title="Logout"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2.5 bg-[#2d3440] border-none rounded-[10px] text-white outline-none"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              console.log('User clicked:', user)
              onSelectUser(user)
            }}
            className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
              selectedUser?.id === user.id
                ? 'bg-cithi-light'
                : 'bg-[#1f2730] hover:bg-[#2a3340]'
            }`}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">
                {user.name}
              </div>
              <div className="text-gray-400 text-xs truncate">
                {conversations.find(c => c.user.id === user.id)?.lastMessage || 'No messages yet'}
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-4">
            No users found
          </div>
        )}
      </div>
    </div>
  )
}
