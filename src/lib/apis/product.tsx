import axiosInstance from '@/hooks/axiosInstance'

export async function addProduct(data: any) {
  try {
    const response = await axiosInstance.post(`/product/new`, data)
    return response
  } catch (error) {
    console.error('Error fetching Product details:', error)
  }
}

export async function getAllProducts() {
  const response = await axiosInstance.get(`/product/all`)
  return response
}

export async function getProductDetails(id: string) {
  const response = await axiosInstance.get(`/product/${id}`)
  return response
}

export async function updateProduct(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`/product/update/${id}`, data)
    return response
  } catch (error) {
    console.error('Error fetching Product details:', error)
  }
}
