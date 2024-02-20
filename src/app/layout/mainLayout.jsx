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
  // return (
  //   <div className='bg-green-400'>
  //     <ResizablePanelGroup
  //       direction='horizontal'
  //       className='rounded-lg border min-h-[100vh] p-0 bg-red-300'>
  //       <ResizablePanel
  //         // className='bg-[#20A459]'
  //         defaultSize={11}>
  //         <div
  //           className='flex flex-col gap-2 h-full p-5 w-[200px] bg-[#20A459]'
  //           // style={{ background: '#20A459' }}
  //         >

  //         </div>
  //       </ResizablePanel>
  //       {/* <ResizableHandle withHandle /> */}
  //       <ResizablePanel defaultSize={88}>
  //         <div className='flex h-full  justify-center p-6'>
  //           <span className='font-semibold'>{children}</span>
  //         </div>
  //       </ResizablePanel>
  //     </ResizablePanelGroup>
  //   </div>
  // )

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='max-w-md rounded-lg border'
      style={{ height: '90vh' }}>
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
              // className={`${pathname === item?.route ? ' outline' : ''}`}
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
          className='flex h-full justify-center p-6'
          // style={{ background: 'red' }}
        >
          <span className='font-semibold'>{children}</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
