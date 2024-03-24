import axiosInstance from '@/hooks/axiosInstance'

export default async function getMemberDetails(id: string) {
  const response = await axiosInstance.get(`/all-members/${id}`)
  const memberData = response
  // console.log(memberData)
  return memberData
}
