'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axiosInstance from '@/hooks/axiosInstance'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover'
import { ColumnDef } from '@tanstack/react-table'
import { Check, ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type Member = {
  _id: string
  address1: string
  address2: string
  email: string
  image: string
  fatherName: string
  fullName: string
  fundSource: string
  gender: string
  phoneNumber: string
}

export const columns: ColumnDef<Member>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => (
      <Image
        height={50}
        width={50}
        alt='profile'
        src={
          row.getValue('image') ||
          'https://img.freepik.com/free-photo/green-sprouts-dark-soil-against-blurred-background-symbolizing-concept-growth-potential_90220-1462.jpg?t=st=1708622844~exp=1708626444~hmac=9fe25c21cfa7cccb2d83cd0cb7249578a358624934ab919850a623a75e26f853&w=1380'
        }
      />
    )
  },
  {
    accessorKey: 'fullName',
    header: 'Name',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('fullName')}</div>
    )
  },
  {
    accessorKey: 'address1',
    header: () => <div>Address</div>,
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('address1')}</div>
    )
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div>Phone Number</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('phoneNumber')}</div>
    }
  },
  {
    id: 'add-money',
    // accessorKey: 'phoneNumber',
    header: () => <div>Balance</div>,
    cell: ({ row }) => {
      return <AddMoneyModal member={row.original} />
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const member = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                const productData = `
                ${member?.fullName},
                  address: ${member?.address1},
                  phone: ${member?.phoneNumber}
                `
                navigator.clipboard.writeText(productData)
              }}>
              Copy member info
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/all-members/${member?._id}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/all-members/update-profile/${member?._id}`}>
                Update Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

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
      // toast.success('Balance added')
      setLoading(false)
    }
    console.log(data)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add</Button>
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
