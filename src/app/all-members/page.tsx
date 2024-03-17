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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import axiosInstance from '@/hooks/axiosInstance'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

const AllMembers = () => {
  return (
    <div>
      <MembersCard />
    </div>
  )
}

export default AllMembers
function MembersCard() {
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
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSaveAmount = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const formData = {
      memberId: member?._id,
      amount: +form.amount.value,
      month: value,
      note: form.note.value,
      address1: member?.address1,
      email: member?.email,
      fundSource: member?.fundSource,
      image: member?.image,
      fullName: member?.fullName,
      phoneNumber: member?.phoneNumber,
      gender: member?.gender
    }
    const response = await axiosInstance.post(`/add-balance`, formData)
    const data = response.data
    if (data?.status == 201) {
      toast.success('Balance added')
      setLoading(false)
    }
    console.log(data)
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
                Select Month
              </Label>
              <ComboBox
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
              />
            </div>
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
              <Button className='w-[100%]' type='submit'>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const ComboBox: React.FC<ComboBoxProps> = ({
  open,
  setOpen,
  value,
  setValue
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {value ? months.find((month) => month === value) : 'Select month...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search month...' />
          <CommandEmpty>No month found.</CommandEmpty>
          <CommandGroup>
            {months.map((month) => (
              <CommandItem
                key={month}
                value={month}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === month ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {month.toUpperCase()}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
