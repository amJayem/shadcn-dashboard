'use client'

import { Button } from '@/components/ui/button'
import axiosInstance from '@/hooks/axiosInstance'
import { getProjectDetails } from '@/lib/apis/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
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
  const { id } = useParams()
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
      type: 'text',
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
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await axiosInstance.put(
        `/project/update/${id}`,
        formData
      )
      const responseData = response.data
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        // Fetch member details from API
        const response = await getProjectDetails(id as string)
        const data = response?.data?.data

        type FormField = 'projectTitle' | 'projectAmount' | 'projectDetails'
        type Type = 'text' | 'number'

        Object.entries(data).forEach(([key, value]) => {
          setValue(key as FormField, value as Type)
        })
      } catch (error) {
        console.error('Error fetching project details:', error)
      }
    }
    fetchMemberDetails()
  }, [id, setValue])

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
      <Button type='submit'>Update</Button>
    </form>
  )
}
