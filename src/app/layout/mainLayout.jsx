'use client'

import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainLayout({ children }) {
  const pathname = usePathname()
  const navItem = [
    { name: 'Home', route: '/' },
    { name: 'Add New Member', route: '/members' },
    { name: 'About', route: '/about' }
  ]

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className=' rounded-lg border'
      style={{ height: '90vh', width: '100%' }}>
      <ResizablePanel defaultSize={20}>
        <div
          className='flex flex-col'
          style={{
            background: '#20A459',
            height: '100%',
            padding: '5px'
          }}>
          {navItem?.map((item) => (
            <Link
              key={item?.route}
              style={{
                background: pathname === item?.route ? '#20A459' : '#FFDE59',
                border:
                  pathname === item?.route
                    ? '2px solid #FFDE59'
                    : '1px solid #20A459',
                padding: '5px',
                margin: '5px',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center',
                color: pathname === item?.route ? 'wheat' : ''
              }}
              href={item?.route}>
              <span className='font-semibold'>{item?.name}</span>
            </Link>
          ))}
        </div>
      </ResizablePanel>
      {/* <ResizableHandle withHandle /> */}
      <ResizablePanel defaultSize={80}>
        <div
          className='mx-auto  p-6'
          // style={{ background: 'red' }}
        >
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
