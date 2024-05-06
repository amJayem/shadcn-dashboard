'use client'
import axiosInstance from '@/hooks/axiosInstance'
import React, { useEffect, useState } from 'react'

interface Project {
  totalCount: number
}

interface Member {
  allUsers: any[] // You need to specify the type of 'allUsers' based on your data structure
  totalCount: number
}

export default function Home() {
  const [totalBalance, setTotalBalance] = useState('0') // Define type as 'number | undefined'
  const [projectList, setProjectList] = useState<Project | undefined>(undefined) // Define type as 'Project | undefined'
  const [memberList, setMemberList] = useState<Member>({
    allUsers: [],
    totalCount: 0
  }) // Define type as 'MemberList'

  useEffect(() => {
    try {
      axiosInstance.get('/get-balance').then((response) => {
        console.log(response.data)
        const data = response.data
        setTotalBalance(data?.totalAmount)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      axiosInstance.get('/project/all').then((response) => {
        console.log(response.data)
        if (response.data.status == 200) {
          const data = response.data
          setProjectList(data)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      axiosInstance.get('/member/all').then((response) => {
        console.log(response.data)
        setMemberList(response?.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const totalInvestedAmount = parseFloat(totalBalance)

  // Format the amount as a bdt amount
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'bdt'
  }).format(totalInvestedAmount)

  return (
    <div>
      {memberList?.allUsers.length === 0 ? (
        <text className='text-red-500'>
          No user is added yet. Please add a Member first.
        </text>
      ) : (
        <>
          <text>Total invested amount: {formatted || 0}</text>
          <br />
          <text>Total projects: {projectList?.totalCount || 0}</text>
          <br />
          <text>Total Investors: {memberList?.totalCount || 0}</text>
        </>
      )}
    </div>
  )
}
