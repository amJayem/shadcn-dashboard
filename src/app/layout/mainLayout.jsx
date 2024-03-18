'use client'

import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NavBar from './nav-bar'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaCircleArrowLeft } from 'react-icons/fa6'
import React, { useEffect, useState } from 'react'

export function MainLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(true)
  const pathname = usePathname()
  // console.log(pathname)
  const navItem = [
    { name: 'Home', route: '/' },
    { name: 'Add Member', route: '/members' },
    { name: 'All Members', route: '/all-members' },
    { name: 'New project', route: '/new-project' },
    { name: 'All projects', route: '/all-projects' }
  ]
  // const screenWidth = window.innerWidth
  const [screenWidth, setScreenWidth] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize() // Initial call to set initial screenWidth
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array ensures that this effect runs only once after mounting

  const flexGrow =
    screenWidth > 700 ? '20' : screenWidth < 700 && !showSideBar ? '0' : '35'

  return (
    <div className={`${screenWidth < 700 ? 'absolute' : ''} `}>
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

const NavItems = ({ pathname, navItem }) => {
  return (
    <div
      className='flex flex-col'
      style={{
        background: '#20A459',
        height: '100%',
        padding: '5px'
      }}>
      {navItem?.map((item) => (
        <React.Fragment key={item?.route}>
          {pathname == '/' && pathname.length == 1 ? (
            <Link
              style={{
                background: pathname.startsWith(item?.route)
                  ? '#20A459'
                  : '#FFDE59',
                border: `1px solid ${
                  pathname.startsWith(item?.route) ? '#FFDE59' : '#20A459'
                }`,
                padding: '5px',
                margin: '5px',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center',
                color: pathname.startsWith(item?.route) ? 'wheat' : ''
              }}
              href={item.route} // Don't forget to specify the href attribute
            >
              {item.name}
            </Link>
          ) : (
            <Link
              style={{
                background:
                  pathname.startsWith(item?.route) && item?.route !== '/'
                    ? '#20A459'
                    : '#FFDE59',
                border: `1px solid ${
                  pathname.startsWith(item?.route) && item?.route !== '/'
                    ? '#FFDE59'
                    : '#20A459'
                }`,
                padding: '5px',
                margin: '5px',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center',
                color:
                  pathname.startsWith(item?.route) && item?.route !== '/'
                    ? 'wheat'
                    : ''
              }}
              href={item.route} // Don't forget to specify the href attribute
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
