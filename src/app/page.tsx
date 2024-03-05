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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axiosInstance from '@/hooks/axiosInstance'

import Image from 'next/image'
import { useEffect, useState } from 'react'
interface Member {
  fullName: string
  _id: number
  email: string
  phoneNumber: string
  address1: string
  fundSource: string
  image: string
}

export default function Home() {
  return (
    <div>
      <MembersCard />
    </div>
  )
  // <CardWithForm />
}

export function MembersCard() {
  // const memberList = [
  //   {
  //     name: 'Asif Mahmud Jayem',
  //     memberId: 1,
  //     email: 'abc@gmail.com',
  //     phoneNumber: '01759375796',
  //     address: 'Syamoli, Dhaka',
  //     fundSource: 'Private Job',
  //     image:
  //       'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
  //   },
  //   {
  //     name: 'Asif Mahmud Jayem',
  //     memberId: 2,
  //     email: 'abc@gmail.com',
  //     phoneNumber: '01759375796',
  //     address: 'Syamoli, Dhaka',
  //     fundSource: 'Private Job',
  //     image:
  //       'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
  //   },
  //   {
  //     name: 'Asif Mahmud Jayem',
  //     memberId: 3,
  //     email: 'abc@gmail.com',
  //     phoneNumber: '01759375796',
  //     address: 'Syamoli, Dhaka',
  //     fundSource: 'Private Job',
  //     image:
  //       'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
  //   },
  //   {
  //     name: 'Asif Mahmud Jayem',
  //     memberId: 4,
  //     email: 'abc@gmail.com',
  //     phoneNumber: '01759375796',
  //     address: 'Syamoli, Dhaka',
  //     fundSource: 'Private Job',
  //     image:
  //       'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
  //   },
  //   {
  //     name: 'Asif Mahmud Jayem',
  //     memberId: 5,
  //     email: 'abc@gmail.com',
  //     phoneNumber: '01759375796',
  //     address: 'Syamoli, Dhaka',
  //     fundSource: 'Private Job',
  //     image:
  //       'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
  //   }
  // ]
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
      {memberList.length > 0 &&
        memberList?.map((member) => (
          <Card key={member?._id} className='w-[350px]'>
            <CardHeader>
              <CardTitle>{member?.fullName}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={
                  member?.image ||
                  'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
                }
                height={0}
                width={100}
                alt={`profile img - ${member?.fullName}`}
                className='rounded-md'
              />
              <CardDescription className='mt-2'>
                Address: {member?.address1}
                <br />
                email: {member?.email}
              </CardDescription>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <AddMoneyModal member={member} />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

function AddMoneyModal({ member }: { member: Member }) {
  const handleSaveAmount = (e: any) => {
    e.preventDefault()
    const form = e.target
    const formData = {
      amount: +form.amount.value,
      note: form.note.value,
      address1: member?.address1,
      email: member?.email,
      fundSource: member?.fundSource,
      image: member?.image,
      _id: member?._id,
      fullName: member?.fullName,
      phoneNumber: member?.phoneNumber
    }
    console.log(formData)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Money</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Money</DialogTitle>
          <DialogDescription>{member?.fullName}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSaveAmount}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Amount
              </Label>
              <Input
                id='amount'
                name='amount'
                type='number'
                placeholder='1000'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Short Note
              </Label>
              <Input
                id='note'
                name='note'
                type='text'
                placeholder='monthly payment'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type='submit'>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
