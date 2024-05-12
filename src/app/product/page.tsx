'use client'
import { DataTable } from '@/app/product/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'

export type Product = {
  id: string
  productTitle: string
  productWholesalePrice: string
  productRetailPrice: string
  _id: string
  productQuantity: string
  unit: string
}

const AddProduct: React.FC = () => {
  // const response = await getAllProducts()
  // const totalProducts = response.data.totalCount
  // const products = response.data.allProducts
  // console.log(products)

  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rof-investors-server.vercel.app/product/all`
        )
        const data = await response.json()
        // console.log(data)
        setProducts(data?.allProducts)
        setTotalProducts(data?.totalCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
