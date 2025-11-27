import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'
import { createMessage, updateUserLastSeen, findUserById } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface SocketServer extends NetServer {
  io?: ServerIO
}

interface NextApiResponseWithSocket extends NextApiRequest {
  socket: NextApiRequest['socket'] & {
    server: SocketServer
  }
}

export default async function SocketHandler(req: NextApiResponseWithSocket, res: any) {
  if (req.socket.server.io) {
    console.log('Socket is already running')
    res.end()
    return
  }

  console.log('Starting Socket.IO server...')

  const io = new ServerIO(req.socket.server as any, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  req.socket.server.io = io

  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication error'))
    }

    const user = verifyToken(token)
    if (!user) {
      return next(new Error('Authentication error'))
    }

    socket.data.userId = user.userId
    next()
  })

  io.on('connection', async (socket) => {
    const userId = socket.data.userId
    console.log(`User connected: ${userId}`)

    // Join user's room
    socket.join(userId)

    // Update last seen
    await updateUserLastSeen(userId)

    // Handle sending messages
    socket.on('send-message', async (data: { receiverId: string; text: string }) => {
      try {
        const message = await createMessage({
          senderId: userId,
          receiverId: data.receiverId,
          text: data.text,
        })

        // Send to receiver if online
        io.to(data.receiverId).emit('receive-message', {
          ...message,
          sender: await findUserById(userId),
        })

        // Confirm to sender
        socket.emit('message-sent', message)
      } catch (error) {
        console.error('Error sending message:', error)
        socket.emit('message-error', { error: 'Failed to send message' })
      }
    })

    // Handle typing indicator
    socket.on('typing', (data: { receiverId: string; isTyping: boolean }) => {
      io.to(data.receiverId).emit('user-typing', {
        userId,
        isTyping: data.isTyping,
      })
    })

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${userId}`)
      await updateUserLastSeen(userId)
    })
  })

  console.log('Socket.IO server started')
  res.end()
}
