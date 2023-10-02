import NavBar from '@/components/navigation/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '42Royal',
  description: 'The competitive coding game made for 42',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-color-mode="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Unna:wght@700&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
