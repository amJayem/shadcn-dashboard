'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DeleteModal } from '@/components/deleteModal'
import { deleteProduct } from '@/lib/apis/product'
import { useToast } from '@/components/ui/use-toast'

export type Product = {
  _id: string
  productTitle: string
  productWholesalePrice: string
  productRetailPrice: string
  productQuantity: string
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
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('productTitle')}</div>
    )
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
    header: () => <div className='text-right'>Retail Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('productRetailPrice'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'bdt'
      }).format(amount)

      return <div className='text-right font-medium'>{formatted}</div>
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
                  product Quantity: ${product?.productQuantity}
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
      const { toast } = useToast()
      const deleteFunction = async (id: any) => {
        const response = await deleteProduct(id as string)
        const data = response?.data

        if (data?.data?.acknowledged == true) {
          toast({ description: data?.message, duration: 1000 })
        } else {
          toast({
            variant: 'destructive',
            title: 'Delete Failed',
            duration: 1000
          })
        }
      }

      const title = row.getValue('productTitle')
      const id = row.original._id
      return (
        <div className='text-right font-medium'>
          <DeleteModal data={{ title, id, deleteFunction }} />
        </div>
      )
    }
  }
]
