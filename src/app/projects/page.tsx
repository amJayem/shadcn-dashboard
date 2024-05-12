'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
  _id: string
  projectTitle: string
  projectAmount: string
  projectDetails: string
}

const AllProjects = () => {
  // const response = await getAllProjects()
  // const projectList = response.data?.allProject

  const [projectList, setProjectList] = useState<Project[]>([])
  const [totalProject, setTotalProject] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = //await axiosInstance.get('/all-members')
          await fetch(`https://rof-investors-server.vercel.app/project/all`)
        const data = await response.json()

        // console.log(data)
        setProjectList(data?.allProject)
        setTotalProject(data?.totalCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-row gap-5 flex-wrap '>
      <div className='flex items-center justify-between w-full'>
        <text className='text-2xl font-bold'>All projects: {totalProject}</text>
        <Button>
          <Link href={'/projects/new'}>Add new project</Link>
        </Button>
      </div>
      {projectList.length == 0 && (
        <text className='text-red-500'>
          No project data found. Pleas add a Project first.
        </text>
      )}
      {projectList.length > 0 &&
        projectList?.map((item: any) => (
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
              <Button variant='link'>
                <Link href={`/projects/${item?._id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default AllProjects
