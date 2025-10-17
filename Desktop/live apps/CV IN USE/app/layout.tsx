import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RPG CV Portfolio',
  description: 'A retro RPG-themed portfolio showcasing design and development skills',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth bg-modern-darker">
      <body className={`${inter.className} antialiased bg-modern-darker`}>
        {children}
      </body>
    </html>
  )
}
