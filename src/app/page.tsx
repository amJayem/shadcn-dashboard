'use client'
import axiosInstance from '@/hooks/axiosInstance'
import React, { useEffect, useState } from 'react'
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

export default function Home() {
  const [totalBalance, setTotalBalance] = useState()
  const [projectList, setProjectList] = useState()
  const [memberList, setMemberList] = useState<Member[]>([])

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
      axiosInstance.get('/all-members').then((response) => {
        console.log(response.data)
        setMemberList(response?.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div>
      {memberList?.allUsers.length == 0 ? (
        <text className='text-red-500'>
          No user is added yet. Pleas add a Member first.
        </text>
      ) : (
        <>
          <text>Total amount: {totalBalance || 0}tk</text>
          <br />
          <text>Total projects: {projectList?.totalCount || 0}</text>
          <br />
          <text>Total Investors: {memberList?.totalCount || 0}</text>
        </>
      )}
    </div>
  )
}
