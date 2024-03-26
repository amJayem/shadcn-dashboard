import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getProjectDetails } from '@/lib/apis/projects'
import { FaArrowLeft } from 'react-icons/fa6'

interface Params {
  id: string
}

const ProjectDetails: React.FC<{ params: Params }> = async ({ params }) => {
  const { id } = params

  const response = await getProjectDetails(id as string)
  const projectData = response?.data?.data

  return (
    <div>
      <div className='flex items-center gap-3 mb-5'>
        <Link href={'/projects'}>
          <FaArrowLeft />
        </Link>
        <text className='text-2xl font-bold'>Project details</text>
      </div>
      {projectData && (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>{projectData.projectTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={
                projectData.image ||
                'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
              }
              height={200}
              width={200}
              alt={`profile img - ${projectData.fullName}`}
              className='rounded-md'
            />
            <CardDescription className='mt-2 flex flex-col gap-2'>
              <text>
                projectDetails:
                <span className='font-bold'> {projectData.projectDetails}</span>
              </text>
              <text>
                projectAmount:
                <span className='font-bold'> {projectData.projectAmount}</span>
              </text>
              <br />
              project update at: {projectData.updatedAt}
            </CardDescription>
          </CardContent>

          <CardFooter className='flex justify-between'>
            <Button>
              <Link href={`update-project/${id}`}>Update Project </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default ProjectDetails
