import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'cithi-messenger-secret-key-change-in-production'

export interface JWTPayload {
  userId: string
  phone: string
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function getRandomAvatar(): string {
  const avatars = [
    '/avater/miku01.jpg',
    '/avater/luffy.jpg',
    '/avater/luffy02.jpg',
    '/avater/teto.jpg',
    '/avater/ckk.JPG'
  ]
  return avatars[Math.floor(Math.random() * avatars.length)]
}
