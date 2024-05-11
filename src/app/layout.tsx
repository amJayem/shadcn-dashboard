import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from './layout/mainLayout'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ROF-Investors',
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
