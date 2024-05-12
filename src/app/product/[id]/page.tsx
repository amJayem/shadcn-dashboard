'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getProductDetails, updateProduct } from '@/lib/apis/product'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'

// Define component function
const AddProduct: React.FC = () => {
  const { id } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const router = useRouter()

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      const modifiedData = {
        ...data,
        productQuantity: parseInt(data.productQuantity),
        productWholesalePrice: parseFloat(data.productWholesalePrice),
        productRetailPrice: parseFloat(data.productRetailPrice)
      }
      // console.log(newData)
      // return
      const response = await updateProduct(id as string, modifiedData)
      const responseData = response?.data
      console.log(responseData)
      if (responseData?.status == 200) {
        toast({
          variant: 'default',
          title: responseData?.message
        })
        router.push('/product')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        // Fetch member details from API
        const response = await getProductDetails(id as string)
        const data = response?.data?.data
        Object.entries(data).forEach(([key, value]) => {
          setValue(key, value)
        })
      } catch (error) {
        console.error('Error fetching project details:', error)
      }
    }
    fetchMemberDetails()
  }, [id, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] mx-auto '>
      <div className='flex items-center gap-3 mb-5'>
        <Link href={'/product'}>
          <FaArrowLeft />
        </Link>
        <text className='text-2xl font-bold'>Update Product info</text>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='productTitle'
          className='block text-sm font-medium text-gray-600'>
          Product Title
        </label>
        <input
          required
          type='text'
          placeholder='Write product name'
          className='mt-1 p-2 border rounded-md w-full'
          {...register('productTitle')}
        />
      </div>
      <div className='flex gap-5'>
        <div className='mb-4 flex-1'>
          <label
            htmlFor='productQuantity'
            className='block text-sm font-medium text-gray-600'>
            Product Quantity
          </label>
          <input
            required
            type='number'
            min={0}
            placeholder='Write Product Quantity'
            className='mt-1 p-2 border rounded-md w-full'
            {...register('productQuantity')}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='unit'
            className='block text-sm font-medium text-gray-600'>
            Unit
          </label>
          <input
            required
            type='text'
            min={0}
            placeholder='Quantity Unit (kg, Ltr, ...)'
            className='mt-1 p-2 border rounded-md w-full'
            {...register('unit')}
          />
        </div>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='productWholesalePrice'
          className='block text-sm font-medium text-gray-600'>
          Product Wholesale Price
        </label>
        <input
          // required
          type='number'
          min={0}
          placeholder='Enter Wholesale Price (optional)'
          className='mt-1 p-2 border rounded-md w-full'
          {...register('productWholesalePrice')}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='productRetailPrice'
          className='block text-sm font-medium text-gray-600'>
          Product Retail Price
        </label>
        <input
          required
          type='number'
          min={0}
          placeholder='Enter Product Retail Price'
          className='mt-1 p-2 border rounded-md w-full'
          {...register('productRetailPrice')}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='note'
          className='block text-sm font-medium text-gray-600'>
          Write Note
        </label>
        <input
          type='text'
          placeholder='Write a note or advise for customer (optional)'
          className='mt-1 p-2 border rounded-md w-full'
          {...register('note')}
        />
      </div>
      <Button type='submit'>Save new Product</Button>
    </form>
  )
}

export default AddProduct
