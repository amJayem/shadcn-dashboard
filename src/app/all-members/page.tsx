'use client'
import axiosInstance from '@/hooks/axiosInstance'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { columns } from './columns'
import { DataTable } from './data-table'

interface Member {
  fullName: string
  _id: string
  email: string
  phoneNumber: string
  address1: string
  fundSource: string
  image: string
  gender: string
}

type ComboBoxProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: string // replace with the actual type of your 'value' state
  setValue: React.Dispatch<React.SetStateAction<string>> // replace with the actual type of your 'value' state
}

const AllMembers = () => {
  const [memberList, setMemberList] = useState<Member[]>([])
  useEffect(() => {
    try {
      axiosInstance.get('/all-members').then((response) => {
        console.log(response.data)
        setMemberList(response?.data?.allUsers)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='flex flex-row gap-5 flex-wrap '>
      {memberList.length == 0 && (
        <text className='text-red-500'>
          No user found. Pleas add a Member first.
        </text>
      )}
      <div className='flex items-center gap-3'>
        {/* <Link href={''}>
          <FaArrowLeft />
        </Link> */}
        <text className='text-2xl font-bold'>All members</text>
      </div>
      <DataTable columns={columns} data={memberList} />
    </div>
  )
}

export default AllMembers
