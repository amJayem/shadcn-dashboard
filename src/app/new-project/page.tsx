'use client'

import { Button } from '@/components/ui/button'
import axiosInstance from '@/hooks/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  'project-name': z.string().refine((data) => data.trim().length > 0, {
    message: 'Project name is required'
  }),
  'project-amount': z.string().refine((data) => data.trim().length > 0, {
    message: 'Project investment amount is required'
  }),

  'project-details': z.string().refine((data) => data.trim().length > 0, {
    message: 'Project details is required'
  })
})

type FormData = {
  'project-name': string
  'project-amount': string
  'project-details': string
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
      name: 'project-name',
      label: 'Project Name',
      type: 'text',
      placeholder: 'write project name',
      defaultValue: ''
    },
    {
      name: 'project-amount',
      label: 'Investment amount',
      type: 'number',
      placeholder: 'enter the amount ',
      defaultValue: ''
    },
    {
      name: 'project-details',
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
      const responseData = response.data
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
    // Add your form submission logic here
  }

  return (
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
      <Button type='submit'>Submit</Button>
    </form>
  )
}
