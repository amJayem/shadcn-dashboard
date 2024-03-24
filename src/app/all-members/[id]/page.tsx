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
import UpdateProfile from '../update-profile/[id]/page'
import { getMemberDetails } from '@/lib/apis/member'

interface Params {
  id: string
}

const MemberDetails: React.FC<{ params: Params }> = async ({ params }) => {
  let updateProfile = false
  const { id } = params

  const response = await getMemberDetails(id as string)
  const memberData = response?.data?.member
  console.log(updateProfile)

  return (
    <div>
      {memberData && !updateProfile && (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>{memberData.fullName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={
                memberData.image ||
                'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
              }
              height={200}
              width={200}
              alt={`profile img - ${memberData.fullName}`}
              className='rounded-md'
            />
            <CardDescription className='mt-2 flex flex-col gap-2'>
              <text>
                Father Name:
                <span className='font-bold'> {memberData.fatherName}</span>
              </text>
              <text>
                Present Address:
                <span className='font-bold'> {memberData.address1}</span>
              </text>
              <text>
                Permanent address:
                <span className='font-bold'> {memberData.address2}</span>
              </text>
              <text>
                Email:
                <span className='font-bold'> {memberData.email}</span>
              </text>
              <text>
                Phone number:
                <span className='font-bold'> 0{memberData.phoneNumber}</span>
              </text>
              <text>
                Source of fund:
                <span className='font-bold'> {memberData.fundSource}</span>
              </text>
              <br />
              profile update at: {memberData.updatedAt}
            </CardDescription>
          </CardContent>

          <CardFooter className='flex justify-between'>
            <Button>
              <Link href={`update-profile/${id}`}>Update Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      {updateProfile && <UpdateProfile />}
    </div>
  )
}

export default MemberDetails
