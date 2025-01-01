export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'editor'
  status: 'active' | 'inactive'
  dateJoined: string
  avatar?: string
}

export interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  revenue: number
  engagement: number
  userGrowth: number
  conversionRate: number
}

export interface Settings {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    email: boolean
    push: boolean
    updates: boolean
  }
  security: {
    twoFactorEnabled: boolean
    activeSessions: number
  }
}

export interface APIResponse<T> {
  data?: T
  error?: string
  status: number
}

export interface UserProfile {
  id: string
  fullName: string
  avatar: string
  email: string
  phone: string
  location: string
  timezone: string
  bio: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  createdAt: string
  updatedAt: string
}

export interface UserSettings {
  id: string
  theme: 'light' | 'dark' | 'system'
  notifications: {
    email: boolean
    push: boolean
    updates: boolean
  }
  security: {
    twoFactorEnabled: boolean
    activeSessions: number
  }
  updatedAt: string
}

export interface UserPreferences {
  id: string
  language: string
  timezone: string
  currency: string
  dateFormat: string
  timeFormat: '12h' | '24h'
  weekStart: 'monday' | 'sunday'
  updatedAt: string
}

export interface APIResponse<T> {
  data?: T
  error?: string
  status: number
}
