import axiosInstance from '@/hooks/axiosInstance'

export async function addProduct(data: any) {
  try {
    const response = await axiosInstance.post(`/Product/new`, data)
    return response
  } catch (error) {
    console.error('Error fetching Product details:', error)
  }
}

export async function getAllProducts() {
  const response = await axiosInstance.get(`/Product/all`)
  return response
}

export async function getProductDetails(id: string) {
  const response = await axiosInstance.get(`/Product/${id}`)
  return response
}

export async function updateProduct(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`/Product/update/${id}`, data)
    return response
  } catch (error) {
    console.error('Error fetching Product details:', error)
  }
}
