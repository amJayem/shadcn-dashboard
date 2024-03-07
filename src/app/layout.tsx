import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from './layout/mainLayout'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ROF-Invertors',
  description: 'Rajbari Organic Foods'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} p-1`}>
        <Toaster />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
