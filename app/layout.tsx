import '@/app/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const figtree = localFont({
  src: '../public/fonts/Figtree-VariableFont_wght.ttf',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: 'CITHI Messenger',
  description: 'Fast & secure messaging app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={figtree.variable}>{children}</body>
    </html>
  )
}
