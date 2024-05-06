'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

interface Member {
  fullName: string
  _id: string
  email: string
  phoneNumber: string
  address1: string
  address2: string
  fundSource: string
  image: string
  fatherName: string
  gender: string
}

const AllMembers = async () => {
  // const response = await getAllMembers()
  // const data = response?.data?.allUsers
  // let data: Member[] = []

  const [data, setData] = useState<Member[]>([])
  const [totalMembers, setTotalMembers] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = //await axiosInstance.get('/all-members')
          await fetch(`https://rof-investors-server.vercel.app/member/all`)
        const data = await response.json()
        // const data = response?.data
        console.log(data)
        setData(data?.allUsers)
        setTotalMembers(data?.totalCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  // console.log(data)
  return (
    <div className='flex flex-row gap-5 flex-wrap '>
      {data.length == 0 && (
        <text className='text-red-500'>
          No user found. Pleas add a Member first.
        </text>
      )}
      <div className='flex items-center justify-between w-full'>
        <text className='text-2xl font-bold'>All members: {totalMembers} </text>
        <Button>
          <Link href={'/members/new'}>Add new member</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default AllMembers
