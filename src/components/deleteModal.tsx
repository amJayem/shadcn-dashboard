'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from './ui/button'
import axiosInstance from '@/hooks/axiosInstance'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

export function DeleteModal({ data }: any) {
  const { toast } = useToast()
  const router = useRouter()

  const deleteFunction = async () => {
    const api = data?.api
    try {
      const response = await axiosInstance.delete(api)
      const responseData = response?.data
      if (responseData?.data?.acknowledged == true) {
        // console.log(responseData)
        toast({ description: responseData?.message, duration: 1000 })
        router.push(data?.navigate)
      } else {
        toast({
          variant: 'destructive',
          title: 'Deletion Failed',
          duration: 1000
        })
      }
    } catch (error) {
      console.error('Error occurred during deletion:', error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='btn text-red-500'>
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{data?.title}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteFunction}
            className='btn bg-red-500'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
