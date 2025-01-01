import { toast } from "sonner"
import { getSession } from "next-auth/react"

interface FetchOptions extends RequestInit {
  maxRetries?: number
  baseDelay?: number
  withAuth?: boolean
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

async function fetchWithRetry(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    withAuth = true,
    ...fetchOptions
  } = options

  let lastError: Error | null = null
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add auth header if required
      if (withAuth) {
        const session = await getSession()
        if (session?.accessToken) {
          fetchOptions.headers = {
            ...fetchOptions.headers,
            Authorization: `Bearer ${session.accessToken}`,
          }
        }
      }

      const response = await fetch(`${BASE_URL}${url}`, fetchOptions)
      
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          // Trigger auth refresh or redirect to login
          window.location.href = '/login'
          return response
        }

        throw new APIError(
          response.statusText,
          response.status,
          await response.json().catch(() => null)
        )
      }
      
      return response
    } catch (error) {
      lastError = error as Error
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt)
        toast.error(`Request failed. Retrying in ${delay/1000}s...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}

export const apiClient = {
  async get<T>(url: string, options?: FetchOptions): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'GET',
    })
    return response.json()
  },
  
  async post<T>(url: string, data: any, options?: FetchOptions): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },
  
  async put<T>(url: string, data: any, options?: FetchOptions): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },
  
  async delete<T>(url: string, options?: FetchOptions): Promise<T> {
    const response = await fetchWithRetry(url, {
      ...options,
      method: 'DELETE',
    })
    return response.json()
  },
}
