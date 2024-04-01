'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

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

  amount: string
  month: string
  note: string
  createdAt: string
  updatedAt: string
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
    accessorKey: 'month',
    header: 'Month',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('month')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <div>Amount</div>,
    cell: ({ row }) => <div className='lowercase'>{row.getValue('amount')}</div>
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div>Actual date</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('updatedAt')}</div>
    }
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const balanceHistory = row.original

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
                ${balanceHistory?.month},
                  amount: ${balanceHistory?.amount},
                  payment date: ${balanceHistory?.updatedAt}
                `
                navigator.clipboard.writeText(productData)
              }}>
              Copy payment info
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
