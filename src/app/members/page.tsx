'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
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
  email: z
    .string()
    .email('Invalid email format')
    .refine((data) => data.trim().length > 0, { message: 'Email is required' }),
  phoneNumber: z.string().refine((data) => /^\d{11}$/.test(data), {
    message: 'Phone Number must be 11 digits with no text'
  }),
  address: z.string().refine((data) => data.trim().length > 0, {
    message: 'Address is required'
  }),
  fundSource: z.string().refine((data) => data.trim().length > 0, {
    message: 'Source of fund is required'
  })
})

type FormData = z.infer<typeof schema>

const MyForm: React.FC = () => {
  type FormField = {
    name: 'fullName' | 'email' | 'phoneNumber' | 'address' | 'fundSource'
    label: string
    type: 'text' | 'email' | 'tel'
    placeholder: string
  }

  const formField: FormField[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'write name'
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'write email'
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'enter phone number'
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'write address'
    },
    {
      name: 'fundSource',
      label: 'Source of Funds',
      type: 'text',
      placeholder: 'write about Source of fund'
    }
  ]
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
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
          field.type === 'tel' ? (
            <input
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
