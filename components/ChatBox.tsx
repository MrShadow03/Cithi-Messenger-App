'use client'

import { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface User {
  id: string
  name: string
  phone: string
  avatar: string
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: string
  read: boolean
}

interface ChatBoxProps {
  currentUser: User
  selectedUser: User
}

export default function ChatBox({ currentUser, selectedUser }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
    // Poll for new messages every 2 seconds
    const interval = setInterval(loadMessages, 2000)
    return () => clearInterval(interval)
  }, [selectedUser.id])

  const loadMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${selectedUser.id}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages)
        setTimeout(scrollToBottom, 100)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const messageText = newMessage.trim()
    setNewMessage('')

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedUser.id,
          text: messageText,
        }),
      })

      if (res.ok) {
        // Reload messages to show the new one
        await loadMessages()
        scrollToBottom()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleTyping = (text: string) => {
    setNewMessage(text)
  }

  return (
    <div className="flex-1 bg-cithi-chat flex flex-col">
      {/* Top Bar */}
      <div className="h-[60px] bg-[#1c2530] flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-white font-medium">{selectedUser.name}</span>
            {selectedUser.lastSeen && (
              <div className="text-gray-400 text-xs">
                Last seen {formatDistanceToNow(new Date(selectedUser.lastSeen), { addSuffix: true })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white hover:text-cithi-light transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9.158 5.712L8.756 4.806C8.492 4.214 8.361 3.918 8.164 3.691C7.917 3.407 7.595 3.198 7.236 3.088C6.949 3 6.624 3 5.976 3C5.028 3 4.554 3 4.156 3.182C3.687 3.397 3.263 3.863 3.095 4.351C2.952 4.764 2.993 5.189 3.075 6.04C3.948 15.09 8.910 20.052 17.960 20.925C18.811 21.007 19.236 21.048 19.649 20.905C20.137 20.737 20.603 20.313 20.818 19.844C21 19.446 21 18.972 21 18.024C21 17.376 21 17.051 20.912 16.764C20.802 16.404 20.593 16.083 20.309 15.836C20.082 15.639 19.786 15.508 19.194 15.244L18.288 14.842C17.646 14.557 17.326 14.414 17 14.383C16.688 14.353 16.373 14.397 16.081 14.511C15.776 14.630 15.506 14.854 14.967 15.304C14.430 15.751 14.162 15.975 13.834 16.095C13.543 16.201 13.159 16.240 12.852 16.195C12.507 16.144 12.242 16.003 11.713 15.720C10.067 14.841 9.160 13.933 8.280 12.287C7.997 11.758 7.856 11.493 7.805 11.148C7.760 10.841 7.799 10.457 7.905 10.166C8.025 9.838 8.249 9.570 8.696 9.033C9.146 8.494 9.370 8.224 9.489 7.919C9.603 7.627 9.647 7.312 9.617 7.000C9.586 6.675 9.443 6.354 9.158 5.712Z" stroke="white" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="text-white hover:text-cithi-light transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M2 11C2 7.7 2 6.05 3.025 5.025C4.05 4 5.7 4 9 4H10C13.3 4 14.95 4 15.975 5.025C17 6.05 17 7.7 17 11V13C17 16.3 17 17.95 15.975 18.975C14.95 20 13.3 20 10 20H9C5.7 20 4.05 20 3.025 18.975C2 17.95 2 16.3 2 13V11Z" stroke="white" strokeWidth="1.5"/>
              <path d="M17 8.905L17.126 8.802C19.242 7.056 20.300 6.183 21.150 6.605C22 7.026 22 8.424 22 11.218V12.782C22 15.576 22 16.974 21.150 17.395C20.300 17.817 19.242 16.944 17.126 15.198L17 15.094" stroke="white" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-2.5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[50%] px-4 py-2.5 rounded-[18px] text-white ${
              message.senderId === currentUser.id
                ? 'self-end bg-cithi-msg-right rounded-br-none'
                : 'self-start bg-cithi-msg-left rounded-bl-none'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex bg-[#1c2530] p-4 gap-2.5">
        <input
          type="text"
          placeholder="Write a message…"
          value={newMessage}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 px-3 py-2.5 bg-[#2d3a45] border-none rounded-[20px] text-white outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-cithi-msg-right text-white px-4 rounded-full hover:bg-opacity-90 transition-all"
        >
          ➤
        </button>
      </div>
    </div>
  )
}
