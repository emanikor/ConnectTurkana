const API_URL = 'http://localhost:5000/api'

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getCurrentUser = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}