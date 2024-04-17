'use client'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import axiosInstance from '@/hooks/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'
import { z } from 'zod'

const NewProject = () => {
  return (
    <div>
      <MyForm />
    </div>
  )
}

export default NewProject
// Define the Zod schema for validation
const schema = z.object({
  projectTitle: z.string().refine((data) => data.trim().length > 0, {
    message: 'Project name is required'
  }),
  projectAmount: z.string().refine((data) => data.trim().length > 0, {
    message: 'Project investment amount is required'
  }),

  projectDetails: z.string().refine((data) => data.trim().length > 0, {
    message: 'Project details is required'
  })
})

type FormData = {
  projectTitle: string
  projectAmount: string
  projectDetails: string
}

const MyForm: React.FC = () => {
  type FormField = {
    name: keyof FormData
    label: string
    type: 'text' | 'number'
    placeholder: string
    defaultValue: string
  }

  const formField: FormField[] = [
    {
      name: 'projectTitle',
      label: 'Project Title',
      type: 'text',
      placeholder: 'write project title',
      defaultValue: ''
    },
    {
      name: 'projectAmount',
      label: 'Investment amount',
      type: 'number',
      placeholder: 'enter the amount ',
      defaultValue: ''
    },
    {
      name: 'projectDetails',
      label: 'Project details',
      type: 'text',
      placeholder: 'write project details',
      defaultValue: ''
    }
  ]
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await axiosInstance.post(`/project/new`, formData)
      if (response?.status == 201) {
        toast({
          variant: 'default',
          title: 'New product added successfully!!',
          action: (
            <ToastAction altText='all product page'>
              <Link href={'/projects'}>See projects</Link>
            </ToastAction>
          )
        })
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    // Add your form submission logic here
  }

  return (
    <div>
      <div className='flex items-center gap-3 mb-5'>
        <Link href={'/projects'}>
          <FaArrowLeft />
        </Link>
        <text className='text-2xl font-bold'>Add new project</text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] mx-auto '>
        {formField.map((field) => (
          <div key={field.name} className='mb-4'>
            <label
              htmlFor={field.name}
              className='block text-sm font-medium text-gray-600'>
              {field.label}
            </label>
            {field.type === 'text' || 'number' ? (
              <input
                defaultValue={field.defaultValue}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name)}
                className='mt-1 p-2 border rounded-md w-full'
              />
            ) : null}
            {errors[field.name] && (
              <p className='text-red-500 mt-1'>{errors[field.name]?.message}</p>
            )}
          </div>
        ))}
        <Button type='submit'>Save </Button>
      </form>
    </div>
  )
}
