import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getAllProducts } from '@/lib/apis/product'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import React from 'react'

// Define component function
const AddProduct: React.FC = async () => {
  const response = await getAllProducts()
  const totalProducts = response.data.totalCount
  const products = response.data.data
  console.log(products)

  type Product = {
    _id: string
    productTitle: string
    productQuantity: string
    productWholesalePrice: string
    productRetailPrice: string
    note: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'productTitle',
      header: 'Product Title',
      cell: ({ row }) => <div>{row.getValue('productTitle')}</div>
    },
    {
      accessorKey: 'productQuantity',
      header: 'Product Quantity',
      cell: ({ row }) => <div>{row.getValue('productQuantity')}</div>
    },
    {
      accessorKey: 'productWholesalePrice',
      header: 'Product Wholesale Price',
      cell: ({ row }) => <div>{row.getValue('productWholesalePrice')}</div>
    },
    {
      accessorKey: 'productRetailPrice',
      header: 'Product Retail Price',
      cell: ({ row }) => <div>{row.getValue('productRetailPrice')}</div>
    }
    // Add more columns as needed...
  ]

  return (
    <div>
      <div>Total products: {totalProducts}</div>
      <Button className='my-5'>
        <Link href={'/product/new-product'}>Add new product</Link>
      </Button>
      <div className='flex gap-5'>
        {products.map((product: any) => (
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>{product.productTitle}</CardTitle>
              <CardDescription>{product.note}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.productQuantity}</p>
              <p>{product.productWholesalePrice}</p>
              <p>{product.productRetailPrice}</p>
            </CardContent>
            <CardFooter>
              <Button>
                <Link href={`product/${product._id}`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AddProduct
