import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'

export interface User {
  id: string
  name: string
  phone: string
  password: string
  avatar: string
  createdAt: string
  lastSeen: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: string
  lastMessageTime?: string
}

interface DatabaseSchema {
  users: User[]
  messages: Message[]
  conversations: Conversation[]
}

const defaultData: DatabaseSchema = {
  users: [],
  messages: [],
  conversations: []
}

let db: Low<DatabaseSchema> | null = null

export async function getDatabase() {
  if (db) return db

  const file = join(process.cwd(), 'db.json')
  const adapter = new JSONFile<DatabaseSchema>(file)
  db = new Low(adapter, defaultData)
  
  await db.read()
  
  // Initialize with default data if empty
  if (!db.data) {
    db.data = defaultData
    await db.write()
  }
  
  return db
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'lastSeen'>): Promise<User> {
  const database = await getDatabase()
  
  const user: User = {
    ...userData,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    lastSeen: new Date().toISOString()
  }
  
  database.data.users.push(user)
  await database.write()
  
  return user
}

export async function findUserByPhone(phone: string): Promise<User | undefined> {
  const database = await getDatabase()
  return database.data.users.find(u => u.phone === phone)
}

export async function findUserById(id: string): Promise<User | undefined> {
  const database = await getDatabase()
  return database.data.users.find(u => u.id === id)
}

export async function getAllUsers(): Promise<User[]> {
  const database = await getDatabase()
  return database.data.users
}

export async function updateUserLastSeen(userId: string): Promise<void> {
  const database = await getDatabase()
  const user = database.data.users.find(u => u.id === userId)
  if (user) {
    user.lastSeen = new Date().toISOString()
    await database.write()
  }
}

export async function createMessage(messageData: Omit<Message, 'id' | 'timestamp' | 'read'>): Promise<Message> {
  const database = await getDatabase()
  
  const message: Message = {
    ...messageData,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    read: false
  }
  
  database.data.messages.push(message)
  
  // Update or create conversation
  const conversationId = [messageData.senderId, messageData.receiverId].sort().join('-')
  let conversation = database.data.conversations.find(c => c.id === conversationId)
  
  if (!conversation) {
    conversation = {
      id: conversationId,
      participants: [messageData.senderId, messageData.receiverId],
      lastMessage: messageData.text,
      lastMessageTime: message.timestamp
    }
    database.data.conversations.push(conversation)
  } else {
    conversation.lastMessage = messageData.text
    conversation.lastMessageTime = message.timestamp
  }
  
  await database.write()
  
  return message
}

export async function getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
  const database = await getDatabase()
  return database.data.messages
    .filter(m => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    )
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export async function getConversationsForUser(userId: string): Promise<Conversation[]> {
  const database = await getDatabase()
  return database.data.conversations
    .filter(c => c.participants.includes(userId))
    .sort((a, b) => {
      const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0
      const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0
      return timeB - timeA
    })
}

export async function markMessagesAsRead(userId: string, senderId: string): Promise<void> {
  const database = await getDatabase()
  database.data.messages
    .filter(m => m.senderId === senderId && m.receiverId === userId && !m.read)
    .forEach(m => m.read = true)
  await database.write()
}
