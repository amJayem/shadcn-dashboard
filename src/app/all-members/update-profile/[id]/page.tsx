'use client'

import { Button } from '@/components/ui/button'
import axiosInstance from '@/hooks/axiosInstance'
import { getMemberDetails } from '@/lib/apis/member'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UpdateProfile() {
  return (
    <div className=''>
      <MyForm />
    </div>
  )
}

// Define the Zod schema for validation
const schema = z.object({
  fullName: z.string().refine((data) => data.trim().length > 0, {
    message: 'Full Name is required'
  }),
  fatherName: z.string().refine((data) => data.trim().length > 0, {
    message: 'Father Name is required'
  }),
  email: z
    .string()
    .email('Invalid email format')
    .refine((data) => data.trim().length > 0, { message: 'Email is required' }),
  phoneNumber: z.string().refine((data) => /^\d{11}$/.test(data), {
    message: 'Phone Number must be 11 digits'
  }),
  address1: z.string().refine((data) => data.trim().length > 0, {
    message: 'Address is required'
  }),
  address2: z.string().refine((data) => data.trim().length > 0, {
    message: 'Address is required'
  }),
  fundSource: z.string().refine((data) => data.trim().length > 0, {
    message: 'Source of fund is required'
  }),
  gender: z.string().refine((data) => data.trim().length > 0, {
    message: 'gender is required'
  })
})

type FormData = z.infer<typeof schema>

const MyForm: React.FC = () => {
  const { id } = useParams()
  type FormField = {
    name:
      | 'fullName'
      | 'email'
      | 'phoneNumber'
      | 'address1'
      | 'address2'
      | 'fundSource'
      | 'fatherName'
      | 'gender'
    label: string
    type: 'text' | 'email' | 'number' | 'radio'
    placeholder: string
    defaultValue: string
  }

  const formField: FormField[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'write name',
      defaultValue: ''
    },
    {
      name: 'fatherName',
      label: 'Father Name',
      type: 'text',
      placeholder: 'write father name',
      defaultValue: ''
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'write email',
      defaultValue: ''
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'number',
      placeholder: 'enter phone number',
      defaultValue: ''
    },
    {
      name: 'address1',
      label: 'Present Address',
      type: 'text',
      placeholder: 'write present address',
      defaultValue: ''
    },
    {
      name: 'address2',
      label: 'Permanent Address',
      type: 'text',
      placeholder: 'write permanent address',
      defaultValue: ''
    },
    {
      name: 'fundSource',
      label: 'Source of Funds',
      type: 'text',
      placeholder:
        'write about source of fund... ex(Private job/Govt job/Business/Other)',
      defaultValue: ''
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'text',
      placeholder: 'Male/Female',
      defaultValue: 'Male'
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

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        // Fetch member details from API
        const response = await getMemberDetails(id as string)
        const data = response?.data?.member
        type FormField =
          | 'fullName'
          | 'email'
          | 'phoneNumber'
          | 'address1'
          | 'address2'
          | 'fundSource'
          | 'fatherName'
          | 'gender'
        type Type = 'text' | 'email' | 'number' | 'radio'

        Object.entries(data).forEach(([key, value]) => {
          setValue(key as FormField, value as Type)
        })
      } catch (error) {
        console.error('Error fetching member details:', error)
      }
    }

    fetchMemberDetails()
  }, [id, setValue])

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      // return console.log(formData)
      const response = await axiosInstance.put(`/member/update/${id}`, formData)
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
          {field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'radio' ||
          field.type === 'number' ? (
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
      <Button
        type='submit'
        // className='bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Submit
      </Button>
    </form>
  )
}
