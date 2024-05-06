import axiosInstance from '@/hooks/axiosInstance'

export async function getAllMembers() {
  const response = await axiosInstance.get(`/member/all`)
  // console.log(response)
  return response
}

export async function getMemberDetails(id: string) {
  const response = await axiosInstance.get(`/member/${id}`)
  const memberData = response
  // console.log(memberData)
  return memberData
}
