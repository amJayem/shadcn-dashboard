import { Button } from '@/components/ui/button'
import { getAllMembers } from '@/lib/apis/member'
import Link from 'next/link'
import { columns } from './columns'
import { DataTable } from './data-table'

// interface Member {
//   fullName: string
//   _id: string
//   email: string
//   phoneNumber: string
//   address1: string
//   fundSource: string
//   image: string
//   gender: string
// }

const AllMembers = async () => {
  const response = await getAllMembers()
  const data = response?.data?.allUsers

  return (
    <div className='flex flex-row gap-5 flex-wrap '>
      {data.length == 0 && (
        <text className='text-red-500'>
          No user found. Pleas add a Member first.
        </text>
      )}
      <div className='flex items-center justify-between w-full'>
        <text className='text-2xl font-bold'>All members</text>
        <Button>
          <Link href={'/members/new'}>Add new member</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default AllMembers
