'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { addProduct } from '@/lib/apis/product'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

// Define component function
const AddProduct: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      const modifiedData = {
        ...data,
        productQuantity: parseInt(data.productQuantity),
        productWholesalePrice: parseFloat(data.productWholesalePrice),
        productRetailPrice: parseFloat(data.productRetailPrice)
      }
      // console.log(newData)
      // return
      const response = await addProduct(modifiedData)
      if (response?.status == 201) {
        toast({
          variant: 'default',
          title: 'New product added successfully!!'
        })
        router.push('/product')
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
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

      {isLoading ? (
        <Button disabled>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Saving...
        </Button>
      ) : (
        <Button type='submit'>Save new Product</Button>
      )}
    </form>
  )
}

export default AddProduct
