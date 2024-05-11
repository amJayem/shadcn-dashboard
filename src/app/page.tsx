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
  const [isLoading, setIsLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState('0')
  const [totalProjectCost, setTotalProjectCost] = useState('0')
  const [projectList, setProjectList] = useState<Project>() // Define type as 'Project | undefined'
  const [memberList, setMemberList] = useState<Member>({
    allUsers: [],
    totalCount: 0
  }) // Define type as 'MemberList'

  // Load data when the component mounts
  useEffect(() => {
    setIsLoading(true)
    // Fetch total balance
    axiosInstance
      .get('/get-balance')
      .then((response) => {
        // console.log(response.data)
        const data = response.data
        setTotalBalance(data?.totalAmount)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

    axiosInstance
      .get('/product/cost')
      .then((response) => {
        // console.log(response.data)
        const data = response.data
        setTotalProjectCost(data?.totalAmountCost)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

    // Fetch project list
    axiosInstance
      .get('/project/all')
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 200) {
          const data = response.data
          setProjectList(data)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // Fetch member list
    axiosInstance
      .get('/member/all')
      .then((response) => {
        // console.log(response.data)
        setMemberList(response?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Format the amount as a bdt amount
  const formattedTotalFund = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'bdt'
  }).format(parseFloat(totalBalance))

  const formattedProjectCost = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'bdt'
  }).format(parseFloat(totalProjectCost))

  const formatRestOfFund = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'bdt'
  }).format(parseFloat(totalBalance) - parseFloat(totalProjectCost))

  return (
    <div>
      {isLoading ? (
        <text>Loading...</text>
      ) : (
        <>
          {memberList?.allUsers.length === 0 && !isLoading ? (
            <text className='text-red-500'>
              No user is added yet. Please add a Member first.
            </text>
          ) : (
            <div className='flex flex-col gap-2'>
              <text> Investors: {memberList?.totalCount || 0}</text>
              <text> Amount (Total Fund Raise): {formattedTotalFund || 0}</text>
              <text> Projects: {projectList?.totalCount || 0}</text>
              <text> Invested amount: {formattedProjectCost || 0}</text>
              <text>Balance of fund(ready to invest): {formatRestOfFund} </text>
            </div>
          )}
        </>
      )}
    </div>
  )
}
