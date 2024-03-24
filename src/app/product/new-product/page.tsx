'use client'
import { Button } from '@/components/ui/button'
import { addProduct } from '@/lib/apis/product'
import React from 'react'
import { useForm } from 'react-hook-form'

// Define component function
const AddProduct: React.FC = () => {
  const { register, handleSubmit } = useForm()

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
      const response = await addProduct(modifiedData)
      const responseData = response?.data
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] mx-auto '>
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
      <div className='mb-4'>
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
          htmlFor='productWholesalePrice'
          className='block text-sm font-medium text-gray-600'>
          Product Wholesale Price
        </label>
        <input
          required
          type='number'
          min={0}
          placeholder='Enter Wholesale Price'
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
          placeholder='Write a note (optional)'
          className='mt-1 p-2 border rounded-md w-full'
          {...register('note')}
        />
      </div>
      <Button type='submit'>Save new Product</Button>
    </form>
  )
}

export default AddProduct
