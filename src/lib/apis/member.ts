import axiosInstance from '@/hooks/axiosInstance'

export async function getAllMembers() {
  const response = await axiosInstance.get(`/all-members`)
  // console.log(response)
  return response
}

export async function getMemberDetails(id: string) {
  const response = await axiosInstance.get(`/all-members/${id}`)
  const memberData = response
  // console.log(memberData)
  return memberData
}
