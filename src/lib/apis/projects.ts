import axiosInstance from '@/hooks/axiosInstance'

export default async function getAllProjects() {
  const response = await axiosInstance.get(`/project/all`)
  // console.log(response)
  return response
}
