'use client'

import { DeleteModal } from '@/components/deleteModal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export type Product = {
  _id: string
  productTitle: string
  productWholesalePrice: string
  productRetailPrice: string
  productQuantity: string
  unit: string
}

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: 'productTitle',
    header: 'Product Title',
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className='capitalize'>
          <Link href={`/product/${product?._id}`}>{product?.productTitle}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'productQuantity',
    header: 'Quantity',
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className='capitalize'>
          {product?.productQuantity} {product?.unit}
        </div>
      )
    }
  },
  {
    accessorKey: 'productWholesalePrice',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Wholesale Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('productWholesalePrice')}</div>
    )
  },
  {
    accessorKey: 'productRetailPrice',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Retail Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('productRetailPrice'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'bdt'
      }).format(amount)

      return <div className='text font-medium'>{formatted}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

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
                  ${product?.productTitle},
                  Whole salePrice: ${product?.productWholesalePrice},
                  Retail Price: ${product?.productRetailPrice},
                  product Quantity: ${product?.productQuantity} ${product?.unit}
                `
                navigator.clipboard.writeText(productData)
              }}>
              Copy product data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/product/${product?._id}`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    id: 'delete',
    enableHiding: false,
    header: () => <div className='text-right'>Delete</div>,
    cell: ({ row }) => {
      const title = row.getValue('productTitle')
      const id = row.original._id
      return (
        <div className='text-right font-medium'>
          <DeleteModal
            data={{
              title,
              id,
              api: `product/delete/${id}`,
              navigate: '/'
            }}
          />
        </div>
      )
    }
  }
]
