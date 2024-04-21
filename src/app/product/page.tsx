import { DataTable } from '@/app/product/data-table'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/lib/apis/product'
import Link from 'next/link'
import React from 'react'
import { columns } from './columns'

export type Product = {
  id: string
  productTitle: string
  productWholesalePrice: string
  productRetailPrice: string
}

// Define component function
const AddProduct: React.FC = async () => {
  const response = await getAllProducts()
  const totalProducts = response.data.totalCount
  const products = response.data.allProducts
  // console.log(products)

  return (
    <div>
      <div>Total products: {totalProducts}</div>
      <Button className='my-5'>
        <Link href={'/product/new-product'}>Add new product</Link>
      </Button>
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default AddProduct
