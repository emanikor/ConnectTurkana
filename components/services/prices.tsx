const API_URL = 'http://localhost:5000/api'

export const getPrices = async () => {
  const res = await fetch(`${API_URL}/prices`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data.prices
}

export const postPrice = async (
  priceData: { animal: string; market: string; price: number; demand: string },
  token: string
) => {
  const res = await fetch(`${API_URL}/prices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(priceData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data.price
}

export const deletePrice = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/prices/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}