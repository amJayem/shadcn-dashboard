'use client'

import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NavBar from './nav-bar'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaCircleArrowLeft } from 'react-icons/fa6'
import { useState } from 'react'

export function MainLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(true)
  const pathname = usePathname()
  const navItem = [
    { name: 'Home', route: '/' },
    { name: 'Add Member', route: '/members' },
    { name: 'About', route: '/about' }
  ]
  const screenWidth = window.innerWidth
  const flexGrow =
    screenWidth > 700 ? '20' : screenWidth < 700 && !showSideBar ? '0' : '35'
  return (
    <div className='absolute'>
      <NavBar />
      <button
        onClick={() => setShowSideBar(!showSideBar)}
        className={`${
          screenWidth < 700 && showSideBar ? 'block' : 'hidden'
        } absolute top-20 left-[138px]`}>
        <FaCircleArrowLeft fontSize={'15px'} />
      </button>
      <button
        onClick={() => setShowSideBar(!showSideBar)}
        className={`${
          screenWidth < 700 && !showSideBar ? 'block' : 'hidden'
        } absolute top-20 left-[0]`}>
        <RxHamburgerMenu color='green' fontSize={'25px'} />
      </button>
      <ResizablePanelGroup
        direction='horizontal'
        className=' rounded-lg border'
        style={{ height: '90vh', width: '100%' }}>
        <ResizablePanel
          className='inline-block'
          // style={screenWidth > 700 ? { flexGrow: 20 } : { flexGrow: 10 }}
          style={{ flexGrow: flexGrow }}>
          {screenWidth < 700 && showSideBar && (
            <NavItems
              showSideBar={showSideBar}
              pathname={pathname}
              navItem={navItem}
              screenWidth={screenWidth}
            />
          )}
          {screenWidth > 700 && (
            <NavItems
              showSideBar={showSideBar}
              pathname={pathname}
              navItem={navItem}
              screenWidth={screenWidth}
            />
          )}
        </ResizablePanel>

        <ResizablePanel style={{ overflow: 'scroll', flexGrow: 80 }}>
          <div className='mx-auto  p-6 '>{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

const NavItems = ({ pathname, navItem, screenWidth }) => {
  return (
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
          <span className={`font-semibold ${screenWidth < 700 && 'text-sm'}`}>
            {item?.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
