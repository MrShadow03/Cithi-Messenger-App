# CITHI Messenger App

A real-time messenger application built with Next.js, Socket.IO, and a JSON-based database. Fast, secure, and completely free to deploy on Railway.

## Features

- 📱 **Phone Number Authentication** - Register and login with phone number
- 💬 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **User Management** - See all registered users and start conversations
- 🔔 **Typing Indicators** - See when someone is typing
- 📊 **Message History** - All messages are persisted in a JSON database
- 🎨 **Beautiful UI** - Dark purple theme with smooth animations
- 🚀 **Railway Deployment** - Free hosting with zero configuration

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Socket.IO
- **Database**: lowdb (JSON file-based database)
- **Authentication**: JWT with bcrypt password hashing
- **Deployment**: Railway

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chandan-d-karmaker/Cithi-Messenger-App.git
cd Cithi-Messenger-App
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory (optional):

```env
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Deployment to Railway

### Step 1: Prepare Your Repository

1. Make sure all your code is committed to GitHub
2. The `railway.json` configuration is already included

### Step 2: Deploy on Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up or login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `Cithi-Messenger-App` repository
6. Railway will automatically detect it's a Next.js app and deploy it

### Step 3: Configure Environment Variables (Optional)

In Railway dashboard:
1. Go to your project
2. Click on **Variables**
3. Add:
   - `JWT_SECRET`: Your secure random string
   - `NODE_ENV`: `production`

### Step 4: Database Persistence

The app uses a JSON file (`db.json`) for data storage. On Railway:

1. Go to your project settings
2. Click on **"Volumes"**
3. Add a volume:
   - **Mount Path**: `/app/db.json`
   - This ensures your database persists across deployments

**Note**: Railway's free tier provides 500 hours/month and 1GB storage, which is perfect for this small project.

### Step 5: Get Your URL

Once deployed, Railway will provide you with a URL like:
```
https://cithi-messenger-app.up.railway.app
```

Share this URL to let others access your messenger app!

## Usage

### Registration

1. Visit the app URL
2. Click **"Start Messaging"**
3. Click **"Register"**
4. Enter your name, select country code, enter phone number, and create a password
5. Click the arrow button to register

### Login

1. Visit the app URL
2. Click **"Start Messaging"**
3. Enter your phone number and password
4. Click the arrow button to login

### Chatting

1. After login, you'll see the chat interface
2. Click on any user from the sidebar to start chatting
3. Type your message and press Enter or click send
4. Messages are delivered in real-time to online users

## Project Structure

```
Cithi-Messenger-App/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── messages/      # Message endpoints
│   │   └── users/         # User endpoints
│   ├── auth/              # Login/Register page
│   ├── chat/              # Main chat interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ChatBox.tsx        # Chat message interface
│   ├── EmptyChat.tsx      # Empty state component
│   └── Sidebar.tsx        # User list sidebar
├── lib/
│   ├── auth.ts            # Authentication utilities
│   ├── database.ts        # Database operations
│   └── middleware.ts      # Request middleware
├── pages/api/
│   └── socket.ts          # Socket.IO server
├── public/
│   ├── avater/            # User avatars
│   └── fonts/             # Custom fonts
├── railway.json           # Railway configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## Database Schema

### Users
```typescript
{
  id: string
  name: string
  phone: string
  password: string (hashed)
  avatar: string
  createdAt: string
  lastSeen: string
}
```

### Messages
```typescript
{
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: string
  read: boolean
}
```

### Conversations
```typescript
{
  id: string
  participants: string[]
  lastMessage: string
  lastMessageTime: string
}
```

## Security Features

- ✅ Passwords hashed with bcrypt
- ✅ JWT-based authentication
- ✅ HTTP-only cookies for token storage
- ✅ Input validation on all endpoints
- ✅ Protected API routes

## Limitations

- JSON database (lowdb) is suitable for small-scale applications
- Railway free tier: 500 hours/month, 1GB storage
- No file uploads (messages are text-only)
- No end-to-end encryption (messages stored in plain text in database)

## Future Enhancements

- [ ] Add image/file sharing
- [ ] Group chat support
- [ ] Message search functionality
- [ ] Push notifications
- [ ] End-to-end encryption
- [ ] Voice/video calls
- [ ] User status (online/offline)
- [ ] Message reactions
- [ ] Dark/light theme toggle

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/chandan-d-karmaker/Cithi-Messenger-App/issues) page
2. Create a new issue with details about your problem
3. Contact the maintainer

## Author

**Chandan D Karmaker**
- GitHub: [@chandan-d-karmaker](https://github.com/chandan-d-karmaker)

---

Made with ❤️ using Next.js and Socket.IO
