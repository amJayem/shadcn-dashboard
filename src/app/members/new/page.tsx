'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import axiosInstance from '@/hooks/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastAction } from '@radix-ui/react-toast'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'
import { z } from 'zod'

export default function page() {
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
    message: 'Phone Number must be 11 digits with no text'
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
  const { toast } = useToast()
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
    type: 'text' | 'email' | 'tel' | 'radio'
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
      type: 'tel',
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
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await axiosInstance.post(`/member/add`, formData)
      if (response.status == 201) {
        toast({
          variant: 'default',
          title: 'New member added successfully!!',
          action: (
            <ToastAction altText='all member page'>
              <Button>
                <Link href={'/members'}>See members</Link>
              </Button>
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
        <Link href={'/members'}>
          <FaArrowLeft />
        </Link>
        <text className='text-2xl font-bold'>Add new member</text>
      </div>
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
            field.type === 'tel' ? (
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
    </div>
  )
}
