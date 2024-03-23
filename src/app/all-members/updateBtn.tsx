'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'

type UpdateBtnProps = {
  updateProfile: boolean
}

export const UpdateBtn: React.FC<UpdateBtnProps> = ({ updateProfile }) => {
  return (
    <CardFooter className='flex justify-between'>
      <Button
        onClick={() => {
          updateProfile = true
        }}>
        Update Profile
      </Button>
    </CardFooter>
  )
}
