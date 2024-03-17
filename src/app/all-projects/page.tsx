'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import axiosInstance from '@/hooks/axiosInstance'

import { useEffect, useState } from 'react'

interface Project {
  _id: string
  projectTitle: string
  projectAmount: string
  projectDetails: string
}

const AllProjects = () => {
  const [projectList, setProjectList] = useState<Project[]>([])

  useEffect(() => {
    try {
      axiosInstance.get('/project/all').then((response) => {
        console.log(response.data)
        if (response.data.status == 200) {
          const data = response.data?.allProject
          setProjectList(data)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className='flex flex-row gap-5 flex-wrap '>
      {projectList.length == 0 && (
        <text className='text-red-500'>
          No project data found. Pleas add a Project first.
        </text>
      )}
      {projectList.length > 0 &&
        projectList?.map((item) => (
          <Card key={item?._id} className='w-[350px]'>
            <CardHeader>
              <CardTitle>{item?.projectTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <Image
            src={
              member?.image ||
              'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
            }
            height={0}
            width={100}
            alt={`profile img - ${member?.projectTitle}`}
            className='rounded-md'
          /> */}
              <CardDescription className='mt-2'>
                Amount: {item?.projectAmount}
                <br />
                Details: {item?.projectDetails}
              </CardDescription>
            </CardContent>
            <CardFooter className='flex justify-between'>
              {/* <AddMoneyModal member={member} /> */}
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default AllProjects
