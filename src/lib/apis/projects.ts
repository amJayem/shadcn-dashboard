import axiosInstance from '@/hooks/axiosInstance'

export async function getAllProjects() {
  const response = await axiosInstance.get(`/project/all`)
  // console.log(response)
  return response
}

export async function getProjectDetails(id: string) {
  const response = await axiosInstance.get(`/project/${id}`)
  // console.log(response)
  return response
}

export async function updateProject(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`/project/update/${id}`, data)
    return response
  } catch (error) {
    console.error('Error fetching project details:', error)
  }
}
