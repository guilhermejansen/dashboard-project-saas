import { faker } from '@faker-js/faker'
import { User, UserProfile, UserSettings, UserPreferences } from '@/types'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Random error generator
const shouldError = (errorRate = 0.1) => Math.random() < errorRate

// Error types
const errorScenarios = [
  { status: 400, message: 'Bad Request: Invalid input data' },
  { status: 401, message: 'Unauthorized: Please login again' },
  { status: 403, message: 'Forbidden: Insufficient permissions' },
  { status: 404, message: 'Not Found: Resource does not exist' },
  { status: 500, message: 'Internal Server Error: Please try again later' }
]

export const mockApi = {
  users: {
    async getProfile(id: string) {
      await delay(faker.number.int({ min: 200, max: 1000 }))
      
      if (shouldError()) {
        const error = faker.helpers.arrayElement(errorScenarios)
        throw new Error(error.message)
      }

      return {
        id,
        fullName: faker.person.fullName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        location: faker.location.city(),
        timezone: faker.location.timeZone(),
        bio: faker.lorem.paragraph(),
        socialLinks: {
          twitter: faker.internet.userName(),
          linkedin: faker.internet.userName(),
          github: faker.internet.userName(),
        },
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      }
    },

    async updateSettings(id: string, data: Partial<UserSettings>) {
      await delay(faker.number.int({ min: 300, max: 1200 }))
      
      if (shouldError()) {
        const error = faker.helpers.arrayElement(errorScenarios)
        throw new Error(error.message)
      }

      return {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      }
    },

    async updatePreferences(id: string, data: Partial<UserPreferences>) {
      await delay(faker.number.int({ min: 200, max: 800 }))
      
      if (shouldError()) {
        const error = faker.helpers.arrayElement(errorScenarios)
        throw new Error(error.message)
      }

      return {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      }
    },

    async deleteSessions(id: string) {
      await delay(faker.number.int({ min: 200, max: 600 }))
      
      if (shouldError()) {
        const error = faker.helpers.arrayElement(errorScenarios)
        throw new Error(error.message)
      }

      return {
        success: true,
        message: 'All sessions have been terminated',
        timestamp: new Date().toISOString(),
      }
    },
  },
}
