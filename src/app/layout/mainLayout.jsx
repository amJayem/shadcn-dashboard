'use client'

import React from 'react'
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
      className='rounded-lg border min-h-[90vh] p-0'>
      <ResizablePanel className='bg-[#20A459]' defaultSize={11}>
        <div className='flex flex-col gap-2 h-full p-2 w-[200px]'>
          {navItem?.map((item) => (
            <Link
              className={`link ${pathname === item?.route ? ' outline' : ''}`}
              key={item?.route}
              style={{
                background: '#FFDE59',
                padding: '5px',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center'
              }}
              href={item?.route}>
              <span className='font-semibold'>{item?.name}</span>
            </Link>
          ))}
        </div>
      </ResizablePanel>
      {/* <ResizableHandle withHandle /> */}
      <ResizablePanel defaultSize={88}>
        <div className='flex h-full  justify-center p-6'>
          <span className='font-semibold'>{children}</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
