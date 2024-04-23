import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { getMemberDetails } from '@/lib/apis/member'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { PaymentHistoryTable } from './payment-history-table'
import { columns } from './columns'
import { DeleteModal } from '@/components/deleteModal'

interface Params {
  id: string
}

const MemberDetails: React.FC<{ params: Params }> = async ({ params }) => {
  const { id } = params

  const response = await getMemberDetails(id as string)
  const memberData = response?.data?.member
  const balanceHistory = response?.data?.balanceHistory
  // console.log('balanceHistory: ', balanceHistory)

  let totalAmount = 0

  // Iterate over each object in the balance array
  for (const item of balanceHistory) {
    // Add the amount value of the current object to the total sum
    totalAmount += item.amount
  }

  const formatTotalAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'bdt'
  }).format(totalAmount)

  // console.log(formatTotalAmount)
  return (
    <div>
      <div className='flex items-center gap-3 mb-5'>
        <Link href={'/members'}>
          <FaArrowLeft />
        </Link>
        <text className='text-2xl font-bold'>Member details information</text>
      </div>
      {memberData && (
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
            <DeleteModal
              data={{
                title: memberData.fullName,
                id,
                api: `member/delete/${id}`,
                navigate: '/members'
              }}
            />
          </CardFooter>
        </Card>
      )}
      <div className='my-5'>
        <text className='text-2xl my-10'>
          Total invested amount: {formatTotalAmount}
        </text>
      </div>
      <PaymentHistoryTable columns={columns} data={balanceHistory} />
    </div>
  )
}

export default MemberDetails
